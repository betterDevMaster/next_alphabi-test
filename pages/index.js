import React from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Header from "../components/Header";
import Search from "../components/Search";
import Gallery from "../components/Gallery";
import { useState } from "react";

const Demo = () => {
  const AuthUser = useAuthUser();
  const [searchValue, setSearchValue] = useState(null);

  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div className="p-8">
        {AuthUser.email && (
          <div className="d-flex align-items-center justify-content-center flex-column">
            <Search onChange={setSearchValue} />
            <Gallery searchValue={searchValue} />
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
