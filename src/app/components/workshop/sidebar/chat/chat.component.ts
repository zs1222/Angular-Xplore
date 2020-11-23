import { Component, OnInit, OnDestroy } from '@angular/core';
import Chat, { Client } from 'twilio-chat';
import { Channel } from 'twilio-chat/lib/channel';
import { ChatModule, Message, User, Action, ExecuteActionEvent, SendMessageEvent } from '@progress/kendo-angular-conversational-ui';
import { Observable, Subject, merge, from } from 'rxjs';
import { scan } from 'rxjs/operators';
import { WorkshopParticipant } from 'src/app/models/workshop-participant';
import { TwilioChatService } from 'src/app/services/chat/twilio/twilio-chat.service';
import { ChatTokenRequestDto } from 'src/app/models/dtos/request/chat-token-request-dto';
import { LoginService } from 'src/app/services/login/login.service';
import { KendoMessage } from 'src/app/models/kendo-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  readonly NONEXISTANT_ROOM_ERROR_CODE = 50300;

  user: User;
  feed: Observable<Message[]>;
  participant: WorkshopParticipant;
  channel: Channel;
  accessToken: string;
  client: any;
  isLoading = true;
  private messages: Subject<Message> = new Subject<Message>();

  constructor(private twilioService: TwilioChatService, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.participant = this.loginService.getParticipant();
    this.user = {
      id: this.participant.id,
      name: this.participant.firstName
    };

    // Merge local and remote messages into a single stream
    this.feed = this.messages.pipe(
      // ... and emit an array of all messages
      scan((acc: Message[], x: Message) => [...acc, x], [])
    );

    this.setUpChatClient();
  }

  private buildTwilioUniqueId(): string {
    return `${this.participant.firstName}|${this.participant.id}`;
  }

  setUpChatClient(): void {
    const tokenRequest = new ChatTokenRequestDto();
    tokenRequest.identity = this.buildTwilioUniqueId();

    // Get the chat AccessToken from API and initialize chat client
    this.twilioService.getToken(tokenRequest).subscribe(accessToken => {
      this.accessToken = accessToken.token;
      console.log(accessToken);
      // Set up the Chat Client
      Chat.create(accessToken.token)
        .then((client) => this.setUpChatChannel(client))
        .catch((error) => {
          console.log(`cannot create client with token ${accessToken.token}`);
          console.log(error);
        });
    });
  }

  // Chat client was intialized. Now we need to use the client to join a channel.
  setUpChatChannel(client: Client): void {
    this.client = client;
    this.client.getChannelByUniqueName(this.participant.sessionId).then(
      (channel) => this.joinChannel(channel)
    ).catch((error) => {
      if (error.body.code === this.NONEXISTANT_ROOM_ERROR_CODE) {
        return this.client.createChannel({ uniqueName: this.participant.sessionId });
      } else {
        console.log(error);
      }
    });
  }

  // Join the channel. If we try to join a member that already exists, we get a 'Member already exists' error,
  // so handling this case by silently ignoring error.
  joinChannel(channel: Channel): void {
    this.channel = channel;
    this.channel.join().then().catch(() => { }).then(() => this.completeSetUp());
  }

  // At this point, our channel has loaded. We can now start loading messages, and set up a listener for new messages
  completeSetUp(): void {
    this.isLoading = false;
    this.channel.getMessages().then((messages) => this.messagesLoaded(messages));
    this.channel.on('messageAdded', (message) => this.messageAdded(message));
  }

  // This is where we can pull the existing messages from the channel to display
  messagesLoaded(messages): void {
    messages.items.map(this.twilioMessageToKendoMessage).forEach(message => {
      this.messages.next(message);
    });
  }

  sendMessage(e: SendMessageEvent): void {
    this.channel.sendMessage(e.message.text);
  }

  // Everytime we get a new message, we can add that here to be displayed in UI
  messageAdded(message): void {
    this.messages.next(this.twilioMessageToKendoMessage(message));
  }

  // Clean up client resources
  ngOnDestroy(): void {
    this.client.shutdown();
  }

  twilioMessageToKendoMessage(message): KendoMessage {
    const kendoMessage = new KendoMessage();
    kendoMessage.text = message.body;

    const parts = message.author.split('|');
    const messageAuthor = {
      id: parts[1],
      name: parts[0]
    };
    kendoMessage.author = messageAuthor;
    kendoMessage.timestamp = message.timestamp;
    return kendoMessage;
  }
}
