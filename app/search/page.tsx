import Search from "@/components/modules/Search";
import getCities from "@/helpers/getCities";
import getServices from "@/helpers/getServices";

type Props = {
  searchParams: any;
};

const SearchPage = async ({ searchParams }: Props) => {
  const properties = await getServices(searchParams);

  // const url = createUrl(searchParams);
  const { from, to, date } = searchParams;

  const cities = await getCities();
  const trips = await getServices(searchParams);

  return <Search cities={cities!} trips={trips!} searchParams={searchParams} />;
};

export default SearchPage;

// const createUrl = (searchParams: any) => {
//   let url = "http://localhost:3000/api/service?";

//   for (const param in searchParams) {
//     if (searchParams.hasOwnProperty(param)) {
//       url += `${param}=${searchParams[param]}&`;
//     }
//   }
//   return url;
// };
