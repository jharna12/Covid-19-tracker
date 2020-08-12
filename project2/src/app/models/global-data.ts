export interface GlobalDataSummary{
    [x: string]: any;
    country ?: string, 
    confirmed ?: number,
    death ?: number,
    recovered?: number,
    active  ?: number, //?: means no mandataory feild
}