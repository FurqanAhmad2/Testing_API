import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../apicalls";
import CategoryCard from "../components/common/CategoriesCard/categoryCard";
import Spinner from "../components/common/spinner";
import SubHeading1 from "../components/common/SubHeading1/subHeading1";

const Category = () => {
  const {
    isError: categoriesError,
    isLoading: categoriesLoading,
    data: allCategories,
  } = useQuery({
    queryKey: [`AllCategories`],
    queryFn: getCategories,
  });

  return (
    <div className="categoryPageContainer">
      <div className="categoryPageContent">
        <SubHeading1 text="Category" />

        {categoriesLoading ? <Spinner /> : null}
        {categoriesError ? <h3>Something went wrong</h3> : null}

        <div className="categoryCardContainer">
          {allCategories?.map((e) => {
            return <CategoryCard data={e} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
