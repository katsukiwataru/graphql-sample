import React from 'react';

const App: React.FC = () => {
  const query = `mutation {
    createPost(data: {
      title: "ooo",
      content: "aaa"
    }) {
      id
    }
  }`;

  // const query = `{
  //   posts{
  //     id
  //     content
  //     title
  //   }
  // }`;

  const postData = async () => {
    const data = await fetch("http://localhost:4466/", {
      credentials: 'omit',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query
      }),
      method: 'POST',
      mode: 'cors',
    });
    const jsondata = await data.json();
    console.log(jsondata);
  };

  return (
    <>
      <div>
        <button onClick={postData}>button</button>
      </div>
    </>
  );
};

export default App;
