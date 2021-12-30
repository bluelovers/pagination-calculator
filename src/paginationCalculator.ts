export interface IPageCalculatorOptions
{
	total: number;
	current?: number;
	pageSize?: number;
	pageLimit?: number;
}

export type IPages = (number | "...")[];

export interface IPageInformation
{
	total: number;
	current: number;
	pageCount: number;
	pages: IPages;
	next: number | false;
	previous: number | false;
	showingStart: number;
	showingEnd: number;
}

export function paginationCalculator(options: IPageCalculatorOptions): IPageInformation
{
	const { total, pageLimit } = options;
	const current = options.current || 1;
	const pageSize = options.pageSize || 10;

	const pageCount = Math.ceil(total / pageSize);

	const pages = getPages(pageCount, pageLimit, current);

	const next = current < pageCount && current + 1;
	const previous = current > 1 && current - 1;

	const showingStart = current * pageSize + 1 - pageSize;

	const showingEnd = total < pageSize || current === pageCount
		? total
		: current * pageSize;

	return {
		total,
		current,
		pageCount,
		pages,
		next,
		previous,
		showingStart,
		showingEnd,
	};
}

export function getPages(pageCount: number, pageLimit: number, current: number): IPages
{
	const pages: IPages = [];

	// add all pages
	if (typeof pageLimit === 'undefined' || pageCount <= pageLimit)
	{
		addPageRange(pages, 1, pageCount);
		return pages;
	}

	const threshold = Math.ceil(pageLimit / 2);

	// we're near the start so add the first lot and the last few e.g. 1234..78
	if ((current - 1) <= threshold)
	{
		addPageRange(pages, 1, pageLimit - 3);
		addEllipsis(pages);
		addPageRange(pages, pageCount - 1, pageCount);
		return pages;
	}

	// we're near the end so add the first few and the last lot e.g. 12..5678
	if (current + 1 > (pageCount - threshold))
	{
		addPageRange(pages, 1, 2);
		addEllipsis(pages);
		addPageRange(pages, pageCount - (threshold + 1), pageCount);
		return pages;
	}

	if (current > threshold && current <= (pageCount - threshold))
	{
		addPageRange(pages, 1, getStartMax(current, pageCount, pageLimit));
		addEllipsis(pages);
		addPageRange(pages, current - 2, current + 2);
		addEllipsis(pages);
		addPageRange(pages, getEndMin(current, pageCount, pageLimit), pageCount);
		return pages;
	}

	return pages;
}

export function addPageRange(pages: IPages, start: number, end: number)
{
	for (let i = start; i < end + 1; i++)
	{
		pages.push(i);
	}
}

export function addEllipsis(pages: IPages) { return pages.push("..."); }

export function getStartMax(current: number, pageCount: number, pageLimit: number)
{
	const max = (pageLimit - 7) / 2;

	return current < pageCount / 2
		? Math.floor(max)
		: Math.ceil(max);
}

export function getEndMin(current: number, pageCount: number, pageLimit: number)
{
	const min = (pageLimit - 7) / 2;

	return pageCount + 1 - (current >= pageCount / 2
		? Math.floor(min)
		: Math.ceil(min));
}
