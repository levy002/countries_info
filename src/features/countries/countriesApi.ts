import { ICountry } from "./interfaces";

export async function fetchCountries(): Promise<ICountry[]> {
  try {
    const baseUrl: string = process.env.REACT_APP_base_url as string;
    const fullUrl = `${baseUrl}/v2/all?fields=name,region,area`;
    const response = await fetch(fullUrl, { method: 'GET' });
    const countries: ICountry[] = await response.json() as unknown as ICountry[]
    return countries;

  } catch (error) {
    throw (JSON.stringify(error))
  }
}