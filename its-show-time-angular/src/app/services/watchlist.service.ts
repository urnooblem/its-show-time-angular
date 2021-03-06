import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/app/movie';


@Injectable({
    providedIn: 'root'
})
export class WatchListService {

    private watchlist: Movie[];
    private observablelist: Observable<Movie[]>;

    constructor() {
        this.watchlist = this.getWatchlist();
        // this.observablelist = Observable.of('watchlist');
    }

    getWatchlist(): Movie[] {
        const localStorageItem = JSON.parse(localStorage.getItem('watchlist'));
        return localStorageItem == null ? [] : localStorageItem.watchlist;
    }

    addMovie(movie: Movie) {
        const movies = this.getWatchlist();
        if (movies.map(function (item) { return item.id; }).indexOf(movie.id) === -1) {
            movies.push(movie);
        }
        this.setLocalStorageWatchlist(movies);
    }

    removeMovie(movie: Movie) {
        const movies = this.getWatchlist();
        const removeIndex = movies.map(function (item) { return item.id; }).indexOf(movie.id);
        movies.splice(removeIndex, 1);
        this.setLocalStorageWatchlist(movies);
    }

    private setLocalStorageWatchlist(watchlist: Movie[]): void {
        localStorage.setItem('watchlist', JSON.stringify({ watchlist: watchlist }));
    }

    // saveReview(movie: Movie, review: string) {
    //     let movies = this.getWatchlist();
    //     let index = movies.map(function(item) {return item.id;}).indexOf(movie.id);
    //     // movies[index].review = review;

    //    /nie da się dodawać tak pól jak w js :(

    //     this.setLocalStorageWatchlist(movies);
    // }

}
