export interface IPageCalculatorOptions {
	total: number;
	current?: number;
	pageSize?: number;
	pageLimit?: number;
}
export declare type IPages = (number | "...")[];
export interface IPageInformation {
	total: number;
	current: number;
	pageCount: number;
	pages: IPages;
	next: number | false;
	previous: number | false;
	showingStart: number;
	showingEnd: number;
}
export declare function paginationCalculator(options: IPageCalculatorOptions): IPageInformation;
export declare function getPages(pageCount: number, pageLimit: number, current: number): IPages;
export declare function addPageRange(pages: IPages, start: number, end: number): void;
export declare function addEllipsis(pages: IPages): number;
export declare function getStartMax(current: number, pageCount: number, pageLimit: number): number;
export declare function getEndMin(current: number, pageCount: number, pageLimit: number): number;

export {
	paginationCalculator as default,
};

export {};
