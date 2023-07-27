import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchResults: any[] = [];

  setSearchResults(results: any[]): void {
    this.searchResults = results;
  }

  getSearchResults(): any[] {
    return this.searchResults;
  }
  constructor() { }
}
