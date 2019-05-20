import { compact, correctBounds, Layout } from './utils'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ResponsiveLayout = {[BP in Breakpoint]?: Layout}
type Breakpoints = {[BP in Breakpoint]?: number}

/**
 * Given a width, find the highest breakpoint that matches is valid for it (width > breakpoint).
 *
 * @param  {Breakpoints} breakpoints Breakpoints object (e.g. {lg: 1200, md: 960, ...})
 * @param  {Number} width Screen width.
 * @return {Breakpoint}       Highest breakpoint that is less than width.
 */
export function getBreakpointFromWidth(
	breakpoints: Breakpoints,
	width: number
): Breakpoint {
	const sorted = sortBreakpoints(breakpoints)
	let matching = sorted[0]
	for (let i = 1; i < sorted.length; i++) {
		const breakpointName = sorted[i]
		const breakpoint = breakpoints[breakpointName]
		if (breakpoint && width > breakpoint) matching = breakpointName
	}
	return matching
}

/**
 * Given a breakpoint, get the # of cols set for it.
 * @param  {String} breakpoint Breakpoint name.
 * @param  {Object} cols       Map of breakpoints to cols.
 * @return {Number}            Number of cols.
 */
export function getColsFromBreakpoint(
	breakpoint: Breakpoint,
	cols: Breakpoints
): number {
	const numCols = cols[breakpoint]
	if (!numCols) {
		throw new Error(
			'ResponsiveReactGridLayout: `cols` entry for breakpoint ' +
			breakpoint +
			' is missing!'
		)
	}
	return numCols
}

/**
 * Given existing layouts and a new breakpoint, find or generate a new layout.
 *
 * This finds the layout above the new one and generates from it, if it exists.
 *
 * @param  {Object} layouts     Existing layouts.
 * @param  {Array} breakpoints All breakpoints.
 * @param  {String} breakpoint New breakpoint.
 * @param  {String} breakpoint Last breakpoint (for fallback).
 * @param  {Number} cols       Column count at new breakpoint.
 * @param  {Boolean} verticalCompact Whether or not to compact the layout
 *   vertically.
 * @return {Array}             New layout.
 */
export function findOrGenerateResponsiveLayout(
	layouts: ResponsiveLayout,
	breakpoints: Breakpoints,
	breakpoint: Breakpoint,
	lastBreakpoint: Breakpoint,
	cols: number
): Layout {
	// If it already exists, just return it.
	if (layouts[breakpoint]) return {...layouts[breakpoint]!}
	// Find or generate the next layout
	let layout = layouts[lastBreakpoint]
	const breakpointsSorted = sortBreakpoints(breakpoints)
	const breakpointsAbove = breakpointsSorted.slice(
		breakpointsSorted.indexOf(breakpoint)
	)
	for (const b of breakpointsAbove) {
		if (layouts[b]) {
			layout = layouts[b]
			break
		}
	}
	layout = layout ? {...layout} : {}
	return compact(correctBounds(layout, cols))
}

/**
 * Given breakpoints, return an array of breakpoints sorted by width. This is usually
 * e.g. ['xs', 'sm', ...]
 *
 * @param  {Object} breakpoints Key/value pair of breakpoint names to widths.
 * @return {Array}              Sorted breakpoints.
 */
export function sortBreakpoints(breakpoints: Breakpoints): Array<Breakpoint> {
	const keys = Object.keys(breakpoints) as Array<Breakpoint>
	return keys.sort(function (a, b) {
		return (breakpoints[a] || 0) - (breakpoints[b] || 0)
	})
}
