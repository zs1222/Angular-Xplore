import { Injectable } from '@angular/core';
import { createClient, Asset } from 'contentful';
import CONTENTFUL_CONSTANTS from '../../constants/contentful.constants';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EntryDto } from '../../models/dtos/response/entry.dto';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private contentfulClient = createClient({
    space: CONTENTFUL_CONSTANTS.space,
    accessToken: CONTENTFUL_CONSTANTS.accessToken
  });

  constructor(private http: HttpClient) {

  }

  async getAssetById(assetId: string): Promise<Asset> {
    return await this.contentfulClient.getAsset(assetId);
  }

  async getEntryById(entryId: string): Promise<EntryDto> {
    return (await this.contentfulClient.getEntry(entryId)).fields as EntryDto;
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http
      .get(imageUrl, { responseType: 'blob' });
  }
}
