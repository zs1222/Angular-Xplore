import { Message, User } from '@progress/kendo-angular-conversational-ui';
import { ImplicitReceiver } from '@angular/compiler';

export class KendoMessage implements Message {
    author: User;
    text?: string;
    timestamp?: Date;
}

export class KendoMessageAuthor implements User {
    id: any;
    name?: string;
    avatarUrl?: string | import('@angular/platform-browser').SafeUrl;
}
