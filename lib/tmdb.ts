"use server"
export interface MovieResult {
    id: number;
    media_type: 'movie';
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    adult: boolean;
    genre_ids: number[];
    video: boolean;
    original_language: string;
    popularity: number;
}

export interface TVResult {
    id: number;
    media_type: 'tv';
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    adult: boolean;
    genre_ids: number[];
    origin_country: string[];
    original_language: string;
    popularity: number;
}

export type SearchResult = MovieResult | TVResult;

export interface SearchResponse {
    page: number;
    results: SearchResult[];
    total_pages: number;
    total_results: number;
}

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;
const OPTIONS = {
    method: "GET",
    headers: {
        "accept": "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}

export async function searchMovies(query: string): Promise<SearchResponse> {
    const response = await fetch(`${BASE_URL}/search/movie?query=${query}`, OPTIONS);
    const data = await response.json();
    return data;
}

// search tv shows
export async function searchTVShows(query: string): Promise<SearchResponse> {
    const response = await fetch(`${BASE_URL}/search/tv?query=${query}`, OPTIONS);
    const data = await response.json();
    return data;
}

// search people
export async function searchPeople(query: string): Promise<SearchResponse> {
    const response = await fetch(`${BASE_URL}/search/person?query=${query}`, OPTIONS);
    const data = await response.json();
    return data;
}

// search multi
export async function searchMulti(query: string): Promise<SearchResponse> {
    const response = await fetch(`${BASE_URL}/search/multi?query=${query}`, OPTIONS);
    const data = await response.json();
    return data;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
}

export interface CrewMember {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
}

export interface Credits {
    cast: CastMember[];
    crew: CrewMember[];
}

export interface MovieDetail {
    id: number;
    media_type: 'movie';
    title: string;
    original_title: string;
    tagline: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
    genres: Genre[];
    production_companies: ProductionCompany[];
    status: string;
    original_language: string;
    budget: number;
    revenue: number;
    adult: boolean;
    credits: Credits;
}

export interface TVDetail {
    id: number;
    media_type: 'tv';
    name: string;
    original_name: string;
    tagline: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    last_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
    episode_run_time: number[];
    vote_average: number;
    vote_count: number;
    genres: Genre[];
    production_companies: ProductionCompany[];
    status: string;
    original_language: string;
    credits: Credits;
}

export async function getMovieDetails(id: string | number): Promise<MovieDetail> {
    const response = await fetch(`${BASE_URL}/movie/${id}?append_to_response=credits`, OPTIONS);
    const data = await response.json();
    return { ...data, media_type: 'movie' };
}

export async function getTVDetails(id: string | number): Promise<TVDetail> {
    const response = await fetch(`${BASE_URL}/tv/${id}?append_to_response=credits`, OPTIONS);
    const data = await response.json();
    return { ...data, media_type: 'tv' };
}
