import { fetchFirstTeaching } from "~/actions/teaching";

const Page = async () => {
  await fetchFirstTeaching();
};

export default Page;
