import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { fetchData } from "../api/fetch";

export async function loader({ params }: LoaderFunctionArgs) {
  return fetchData(`/users/${params.userId}`);
}

function User() {
  const user: any = useLoaderData();
  console.log(user);

  return (
    <div className="w-2/4 mx-auto">
      <div className="p-4">
        <Link to="/" className="text-sky-700 hover:underline">
          Back to main
        </Link>
      </div>
      <div className="text-center">
        <img
          src={user.avatar}
          className="mx-auto"
          alt={user.name + " avatar"}
        />
        <p className="my-5">Random pic!</p>
        <img
          src="https://source.unsplash.com/random"
          alt="Absolutely random pic!"
        />
      </div>
    </div>
  );
}

export default User;
