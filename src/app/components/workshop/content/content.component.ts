import { Component, OnInit, Input } from '@angular/core';
import { ContentService } from 'src/app/services/content/content.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import CONTENTFUL_CONTSTANTS from '../../../constants/contentful.constants';
import VIDEO_MANAGER_CONSTANTS from '../../../constants/video-manager.constants';
import { EntryDto } from 'src/app/models/dtos/response/entry.dto';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() contentId: string;

  image: SafeUrl;
  videoManagerUrl: string = null;

  constructor(private contentService: ContentService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.getContent();
  }

  getContent(): void {
    this.contentService.getEntryById(this.contentId).then((entry) => {
      // Entry is video
      if (this.isVideoEntry(entry)) {
        this.videoManagerUrl = `${VIDEO_MANAGER_CONSTANTS.baseUrl}${entry.videoId}`;
      } else {
        // Entry is image
        this.contentService.getImage(`${CONTENTFUL_CONTSTANTS.protocol}:${entry.media.fields.file.url}`).subscribe((image) => {
          const unsafeImageUrl = URL.createObjectURL(image);
          this.image = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
        });

      }
    });
  }

  isVideoEntry(entry: EntryDto): boolean {
    return !!entry.videoId;
  }
}
