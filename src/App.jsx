import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [fullDataList, setFullList] = useState([]);
  const [displayList, setList] = useState([]);
  const [currPage, setPage] = useState(1);

  const handleFetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
      );

      // console.log(response.data);
      setFullList(response.data);
      setList(response.data.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisplayList = async () => {
    if (currPage === 1) {
      const batchList = await fullDataList?.splice(0, 10);
      setList(batchList);
      // console.log(batchList);
    } else {
      console.log((currPage - 1) * 10);
      console.log(currPage * 10);

      console.log(fullDataList.slice((currPage - 1) * 10));

      const batchList = await fullDataList?.slice(
        (currPage - 1) * 10,
        currPage * 10,
      );
      setList(batchList);
      console.log(batchList);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    handleDisplayList();
  }, [currPage]);

  return (
    <>
      <section>
        <h1>Employee Data Table</h1>

        <table style={{ width: "100%" }}>
          <thead
            style={{
              background: "green",
              border: "none",
              color: "whitesmoke",
              textAlign: "center",
            }}
          >
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
          </thead>

          <tbody>
            {displayList?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <article
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
            gap: "1rem",
          }}
        >
          <button
            style={{
              background: "green",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "3px",
              color: "whitesmoke",
              fontSize: "0.75rem",
            }}
            onClick={() =>
              setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))
            }
          >
            Previous
          </button>
          <button
            style={{
              background: "green",
              border: "none",
              padding: "1rem 1rem",
              borderRadius: "3px",
              color: "whitesmoke",
              fontSize: "0.75rem",
            }}
          >
            {currPage}
          </button>
          <button
            style={{
              background: "green",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "3px",
              color: "whitesmoke",
              fontSize: "0.75rem",
            }}
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Next
          </button>
        </article>
      </section>
    </>
  );
}

export default App;
