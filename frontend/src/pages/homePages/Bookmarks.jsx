import React from "react";
import { useSelector } from "react-redux";
import Vichar from "../../components/subComponents/Vichar";

const Bookmarks = () => {
  const { user } = useSelector((store) => store.user);
  const { vichars } = useSelector((store) => store.vichar);

  const filteredVichars = vichars
    ?.filter((vichar) => vichar.bookmarks.includes(user?._id))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <div>
        <h1 className="text-center mt-4 mb-10 text-xl font-bold">
          Hey {user?.name}, This is your bookmark list.
        </h1>
      </div>
      <div className="mt-4 space-y-4">
        {filteredVichars && filteredVichars.length > 0 ? (
          filteredVichars.map((vichar) => {
            return <Vichar key={vichar?._id} vichar={vichar} />;
          })
        ) : (
          <p className="text-center text-gray-500">No vichars to show here.</p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
