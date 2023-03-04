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
}

export interface ObservationType {
	date: string;
	realtime_end: string;
	realtime_start: string;
	value: string;
}
