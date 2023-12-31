import apiService from "./apiService";

type LookupData = Record<string, any>;

type LookupFunctions = {
  [key in keyof LookupData]: (data: any) => Promise<any>;
};

export const fetchAllLookups = async (): Promise<LookupData> => {
  const lookupFunctions: LookupFunctions = {
    events: getEvents,
    categories:getCategories,
    bookings:getBookings
    // Add other functions as needed
  };

  const resultsArray = await Promise.all(
    Object.keys(lookupFunctions).map((key) => lookupFunctions[key]?.({}))
  );

  return Object.fromEntries(
    Object.keys(lookupFunctions).map((key, index) => [key, resultsArray[index]])
  ) as LookupData;
};

export const getEvents = async () => {
  const response = await apiService.get<any>("/api/events");
  return response.data;
};
export const getCategories = async () => {
  const response = await apiService.get<any>("/api/events-categories");
  return response.data;
};
export const getBookings = async () => {
  const response = await apiService.get<any>("/api/bookings");
  return response.data;
};
