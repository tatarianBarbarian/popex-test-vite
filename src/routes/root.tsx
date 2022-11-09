import { useNavigate, useLoaderData } from "react-router-dom";
import { fetchData } from "../api/fetch";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export async function loader() {
  return fetchData("/users?page=1");
}

function Root() {
  const navigate = useNavigate();
  const users: any = useLoaderData();

  return (
    <div className="App w-2/4 grid mx-auto">
      <table className="table-auto w-full place-self-center">
        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">Name</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">Email</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">ID</div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {users.length &&
            users.map((user: User) => {
              return (
                <tr
                  key={user.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/user/${user.id}`)}
                >
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        <img
                          className="rounded-full"
                          src={user.avatar}
                          width="40"
                          height="40"
                          alt="Alex Shatov"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        {user.first_name + " " + user.last_name}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{user.email}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      {user.id}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Root;
