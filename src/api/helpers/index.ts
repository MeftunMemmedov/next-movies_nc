import axiosInstance from "..";

export const getDataList = async <T>(
  table_name: string,
  params?: Record<string, string | number | undefined>
) => {
  const { data } = await axiosInstance.get(`/${table_name}`, { params });

  return data as T[];
};

export const getData = async <T>(
  table_name: string,
  params: Record<string, string | number | undefined>
) => {
  const { data } = await axiosInstance.get(`/${table_name}`, { params });

  return data[0] as T;
};
