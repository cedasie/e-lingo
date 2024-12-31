"use client";

import { Admin, ListGuesser, Resource } from "react-admin";
import jsonServerProvider from "ra-data-simple-rest";

const dataProvider = jsonServerProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={ListGuesser}
        recordRepresentation="title"
      />
    </Admin>
  );
};

export default App;
