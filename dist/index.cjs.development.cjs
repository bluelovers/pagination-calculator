'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function paginationCalculator(options) {
  const {
    total,
    pageLimit
  } = options;
  const current = options.current || 1;
  const pageSize = options.pageSize || 10;
  const pageCount = Math.ceil(total / pageSize);
  const pages = getPages(pageCount, pageLimit, current);
  const next = current < pageCount && current + 1;
  const previous = current > 1 && current - 1;
  const showingStart = current * pageSize + 1 - pageSize;
  const showingEnd = total < pageSize || current === pageCount ? total : current * pageSize;
  return {
    total,
    current,
    pageCount,
    pages,
    next,
    previous,
    showingStart,
    showingEnd
  };
}
function getPages(pageCount, pageLimit, current) {
  const pages = [];

  if (typeof pageLimit === 'undefined' || pageCount <= pageLimit) {
    addPageRange(pages, 1, pageCount);
    return pages;
  }

  const threshold = Math.ceil(pageLimit / 2);

  if (current - 1 <= threshold) {
    addPageRange(pages, 1, pageLimit - 3);
    addEllipsis(pages);
    addPageRange(pages, pageCount - 1, pageCount);
    return pages;
  }

  if (current + 1 > pageCount - threshold) {
    addPageRange(pages, 1, 2);
    addEllipsis(pages);
    addPageRange(pages, pageCount - (threshold + 1), pageCount);
    return pages;
  }

  if (current > threshold && current <= pageCount - threshold) {
    addPageRange(pages, 1, getStartMax(current, pageCount, pageLimit));
    addEllipsis(pages);
    addPageRange(pages, current - 2, current + 2);
    addEllipsis(pages);
    addPageRange(pages, getEndMin(current, pageCount, pageLimit), pageCount);
    return pages;
  }

  return pages;
}
function addPageRange(pages, start, end) {
  for (let i = start; i < end + 1; i++) {
    pages.push(i);
  }
}
function addEllipsis(pages) {
  return pages.push("...");
}
function getStartMax(current, pageCount, pageLimit) {
  const max = (pageLimit - 7) / 2;
  return current < pageCount / 2 ? Math.floor(max) : Math.ceil(max);
}
function getEndMin(current, pageCount, pageLimit) {
  const min = (pageLimit - 7) / 2;
  return pageCount + 1 - (current >= pageCount / 2 ? Math.floor(min) : Math.ceil(min));
}

exports.addEllipsis = addEllipsis;
exports.addPageRange = addPageRange;
exports["default"] = paginationCalculator;
exports.getEndMin = getEndMin;
exports.getPages = getPages;
exports.getStartMax = getStartMax;
exports.paginationCalculator = paginationCalculator;
//# sourceMappingURL=index.cjs.development.cjs.map
