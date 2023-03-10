import type { ChartData, Point } from 'chart.js';

export interface SeriesType {
	count: number;
	file_type: string;
	limit: number;
	observation_end: string;
	observation_start: string;
	observations: ObservationType[];
	offset: number;
	order_by: string;
	output_type: number;
	realtime_end: string;
	realtime_start: string;
	sort_order: string;
	units: string;
	chart_data: ChartData<'line', (number | Point)[], unknown>;
}

export interface ObservationType {
	date: string;
	realtime_end: string;
	realtime_start: string;
	value: string;
}

export interface ResultType {
	principal_and_interest: string;
	property_tax: string;
}
