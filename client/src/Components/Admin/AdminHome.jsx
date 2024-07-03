import React, { useEffect, useState } from "react";

function AdminPages() {
  const [metrics, setMetrics] = useState(null);
  const [reports, setReports] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [users, setusers] = useState(null);

  useEffect(() => {
    async function getMetrics() {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/getall/metrics"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch metrics");
        }
        const data = await response.json();
        console.log("Metrics:", data);
        setMetrics(data);
        // Process the fetched metrics data here
      } catch (error) {
        console.error("Error fetching metrics:", error.message);
        // Handle errors here
      }
    }

    getMetrics();
  }, [refresh]);

  useEffect(() => {
    async function getReports() {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/getall/reports"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch metrics");
        }
        const data = await response.json();
        console.log("Reports:", data);
        setReports(data);
        // Process the fetched metrics data here
      } catch (error) {
        console.error("Error fetching metrics:", error.message);
        // Handle errors here
      }
    }

    getReports();
  }, [refresh]);

  useEffect(() => {
    async function getReports() {
      try {
        const response = await fetch("http://localhost:8080/users");
        if (!response.ok) {
          throw new Error("Failed to fetch metrics");
        }
        const data = await response.json();
        console.log("Users:", data);
        setusers(data);
        // Process the fetched metrics data here
      } catch (error) {
        console.error("Error fetching metrics:", error.message);
        // Handle errors here
      }
    }

    getReports();
  }, [refresh]);

  async function banUser(id) {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/status/update/ban/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user status");
      }
      const data = await response.json();
      alert("User Banned");
      setRefresh(1);
      // Process the response data here if needed
      console.log("User status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error.message);
      // Handle errors here
    }
  }

  async function unbanUser(id) {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/status/update/unban/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user status");
      }
      const data = await response.json();
      alert("User unBanned");
      setRefresh(2);
      // Process the response data here if needed
      console.log("User status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error.message);
      // Handle errors here
    }
  }

  async function verifyUser(id) {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/status/update/verify/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user status");
      }
      const data = await response.json();
      alert("User is verified");
      setRefresh(2);
      // Process the response data here if needed
      console.log("User status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error.message);
      // Handle errors here
    }
  }

  const [page, setPage] = useState(0);
  if (page === 0) {
    return (
      <div className="w-[80vw] h-[80vh] bg-white rounded-md flex  flex-col px-10 items-center justify-center gap-2 ">
        <button
          onClick={() => {
            setPage(0);
          }}
          className="absolute top-10 left-10"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>

        <h1 className="text-4xl text-pr2 font-bold ">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-sm max-w-3xl text-center text-zinc-500">
          Administering tasks, especially those involving user management, data
          handling, and decision-making, necessitates meticulous attention to
          detail and thoughtful consideration of various factors to ensure the
          integrity, security, and fairness of the system. When it comes to
          actions such as deleting users, banning them, viewing reports, and
          verifying users, administrators must take numerous precautions to
          handle these responsibilities responsibly.
        </p>

        <div className="flex flex-row gap-2 w-[100%] f items-center justify-center mt-10">
          <div
            onClick={() => {
              setPage(1);
            }}
            className="bg-pr2  rounded-md w-[33%] h-[180px] hover:bg-[#0A1048] cursor-pointer flex items-center justify-center"
          >
            <h1 className="font-medium text-white text-xl">
              View Business Reports
            </h1>
          </div>
          <div
            onClick={() => {
              setPage(2);
            }}
            className="bg-pr2  rounded-md w-[33%] h-[180px] hover:bg-[#0A1048] cursor-pointer flex items-center justify-center"
          >
            <h1 className="font-medium text-white text-xl">Ban Users</h1>
          </div>
        </div>
        <div className="flex flex-row gap-2 w-[100%] f items-center justify-center">
          <div
            onClick={() => {
              setPage(3);
            }}
            className="bg-pr2  rounded-md w-[33%] h-[180px] hover:bg-[#0A1048] cursor-pointer flex items-center justify-center"
          >
            <h1 className="font-medium text-white text-xl">View Reports</h1>
          </div>
          <div
            onClick={() => {
              setPage(4);
            }}
            className="bg-pr2  rounded-md w-[33%] h-[180px] hover:bg-[#0A1048] cursor-pointer flex items-center justify-center"
          >
            <h1 className="font-medium text-white text-xl">Verify Users</h1>
          </div>
        </div>
      </div>
    );
  } else if (page === 1) {
    return (
      <div className="w-[80vw] h-[80vh] bg-white rounded-md flex  flex-col px-10 items-center justify-center gap-2 ">
        <button
          onClick={() => {
            setPage(0);
          }}
          className="absolute top-10 left-10"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>

        <h1 className="text-4xl text-pr2 font-bold  ">Business Reports</h1>

        <div className="flex flex-row flex-wrap gap-3 items-center justify-center mt-10">
          <div className="bg-white w-[250px] h-[200px] flex items-center justify-center px-3 flex-col gap-3 shadow-md rounded-md border-4 border-gray-50">
            <h1 className="text-8xl text-pr2 font-bold">
              {metrics[0].userCount}
            </h1>
            <h1 className="text-xl font-bold">Number of Users</h1>
          </div>

          <div className="bg-white w-[250px] h-[200px] flex items-center justify-center px-3 flex-col gap-3 shadow-md rounded-md border-4 border-gray-50">
            <h1 className="text-8xl text-pr2 font-bold">
              {metrics[0].itemCount}
            </h1>
            <h1 className="text-xl font-bold">Number of Items</h1>
          </div>

          <div className="bg-white w-[250px] h-[200px] flex items-center justify-center px-3 flex-col gap-3 shadow-md rounded-md border-4 border-gray-50">
            <h1 className="text-8xl text-pr2 font-bold">
              {metrics[0].itemsOnRent}
            </h1>
            <h1 className="text-xl font-bold">
              Number of Items <br /> on Rent
            </h1>
          </div>

          <div className="bg-white w-[250px] h-[200px] flex items-center justify-center px-3 flex-col gap-3 shadow-md rounded-md border-4 border-gray-50">
            <h1 className="text-8xl text-pr2 font-bold">
              {metrics[0].verifiedUsers}
            </h1>
            <h1 className="text-xl font-bold">
              Number of <br />
              Verified users
            </h1>
          </div>

          <div className="bg-white w-[250px] h-[200px] flex items-center justify-center px-3 flex-col gap-3 shadow-md rounded-md border-4 border-gray-50">
            <h1 className="text-8xl text-pr2 font-bold">
              {metrics[0].BannedUsers}
            </h1>
            <h1 className="text-xl font-bold">
              Number of <br />
              Banned Users
            </h1>
          </div>

          <div className="bg-white w-[250px] h-[200px] flex items-center justify-center px-3 flex-col gap-3 shadow-md rounded-md border-4 border-gray-50">
            <h1 className="text-8xl text-pr2 font-bold">
              {metrics[0].OnlineUsers}
            </h1>
            <h1 className="text-xl font-bold">
              Number of <br />
              Online users
            </h1>
          </div>

          <div className="bg-white w-[250px] h-[200px] flex items-center justify-center px-3 flex-col gap-3 shadow-md rounded-md border-4 border-gray-50">
            <h1 className="text-8xl text-pr2 font-bold">
              {metrics[0].NumberOfReports}
            </h1>
            <h1 className="text-xl font-bold">
              Number of verified <br /> users
            </h1>
          </div>
        </div>
      </div>
    );
  } else if (page === 2) {
    return (
      <div className="w-[80vw] h-[80vh] bg-white rounded-md flex  flex-col px-10 items-center justify-center gap-2 ">
        <button
          onClick={() => {
            setPage(0);
          }}
          className="absolute top-10 left-10"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>

        <h1 className="text-4xl text-pr2 font-bold ">Ban User</h1>
        <div className="flex flex-col gap-3 px-10 w-[100%] h-[70%] overflow-auto mt-10">
          {users &&
            users.map((user, index) => (
              <div
                key={index}
                className="flex flex-row gap-3 items-center justify-between border-4 border-gray-50 rounded-md py-3 px-5"
              >
                <div className="flex flex-row gap-16">
                  <h1 className="font-bold">{user.userId}</h1>
                  <h1 className="font-bold">{user.name}</h1>
                </div>

                <h1>{user.email}</h1>

                <div className="flex flex-row gap-16">
                  <button
                    onClick={() => {
                      alert("You are going to ban the user");
                      banUser(user.userId);
                    }}
                    className="text-lg font-bold cursor-pointer text-red-500"
                  >
                    Ban
                  </button>
                  {/* <button
                 onClick={
                    ()=>{
                        alert("You are going to ban the user");
                        verifyUser(user.userId)
                    }
                }  className="text-lg font-bold cursor-pointer text-green-500">Verify</button> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  } else if (page === 3) {
    return (
      <div className="w-[80vw] h-[80vh] bg-white rounded-md flex  flex-col px-5 items-center justify-center gap-2 ">
        <button
          onClick={() => {
            setPage(0);
          }}
          className="absolute top-10 left-10"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>

        <h1 className="text-4xl text-pr2 font-bold ">User Reports</h1>
        <div className="mt-10 overflow-auto">
          {reports && reports.length > 0 ? (
            reports.map((report, index) => (
              <div
                key={index}
                className="bg-white rounded-md justify-between items-center shadow-md w-[70vw] h-auto flex flex-row gap-5 px-3 py-3 border-4 border-gray-100 "
              >
                <h1 className="text-6xl text-pr1 font-bold ml-3">
                  {index + 1}
                </h1>

                <div className="flex items-center flex-row gap-5">
                  <div className="font-bold flex items-center justify-center   min-h-[120px] flex-col border-4 border-gray-100 rounded-md p-5 ">
                    <h1 className="text-red-500">Victim</h1>
                    <h1 className="font-normal text-sm">Id: {report.victim}</h1>
                    <p className="font-bold">{report.victimName}</p>
                  </div>

                  <div className="font-bold flex items-center justify-center   min-h-[120px] flex-col border-4 border-gray-100 rounded-md p-5 ">
                    <h1 className="text-red-500">SubmittedBy</h1>
                    <h1 className="font-normal text-sm">Id: {report.filer}</h1>
                    <p className="font-bold">{report.filerName}</p>
                  </div>
                  <div className="font-bold flex items-center justify-center  min-h-[120px] flex-col border-4 border-gray-100 rounded-md p-5 ">
                    <h1 className="text-red-500">Victim </h1>
                    <h1 className="font-normal text-sm">Status</h1>
                    {report.victimStatus === "blocked" ? (
                      <p className="font-bold">banned</p>
                    ) : (
                      <p className="font-bold">{report.victimStatus}</p>
                    )}
                  </div>

                  <div className="font-bold min-w-[300px] min-h-[120px] flex items-center justify-center flex-col border-4 border-gray-100 rounded-md p-5 ">
                    <h1 className="text-red-500">Reason</h1>
                    <h1 className="font-bold">{report.reportText}</h1>
                  </div>
                </div>

                {report && report.victimStatus === "blocked" ? (
                  <button
                    onClick={() => {
                      alert(`You are going to ban user ${report.victimName}`);
                      unbanUser(report.victim);
                    }}
                    className="w-[180px] h-[120px] font-bold text-white text-lg bg-red-500 rounded-md"
                  >
                    UNBAN USER
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      alert(`You are going to ban user ${report.victimName}`);
                      banUser(report.victim);
                    }}
                    className="w-[180px] h-[120px] font-bold text-white text-lg bg-red-500 rounded-md"
                  >
                    BAN USER
                  </button>
                )}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  } else if (page === 4) {
    return (
      <div className="w-[80vw] h-[80vh] bg-white rounded-md flex  flex-col px-10 items-center justify-center gap-2 ">
        <button
          onClick={() => {
            setPage(0);
          }}
          className="absolute top-10 left-10"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>

        <h1 className="text-4xl text-pr2 font-bold ">Verify User</h1>
        <div className="flex flex-col gap-3 px-10 w-[100%] h-[70%] mt-10 overflow-auto">
          {users &&
            users.map((user, index) => (
              <div
                key={index}
                className="flex flex-row gap-3 items-center  justify-between border-4 border-gray-50 rounded-md p-10"
              >
                <div className="flex flex-col gap-2 min-w-[300px]">
                  <h1 className="font-bold">Id: {user.userId}</h1>
                  <h1 className="font-bold">Name: {user.name}</h1>
                
                  <h1>Status : {user.status}</h1>
                  <h1>CNIC : {user.cnic}</h1>
                  <h1>Phone : {user.phone}</h1>
                  <h1>Email : {user.email}</h1>
                  <button
                    onClick={() => {
                      alert("You are going to verify the user");
                      verifyUser(user.userId);
                    }}
                    className="text-lg font-bold cursor-pointer bg-green-700 text-white rounded-md w-[320px]"
                  >
                    verify
                  </button>
                </div>


<div className="flex flex-row items-center justify-center min-w-[300px]">
<div className="overflow-hidden w-[300px] h-[150px]">
                  <img src={user.cnicFront} className="h-[150px]" alt="" />
                </div>

                <div className="overflow-hidden w-[150px] h-[150px] rounded-full">
                  <img src={user.profilePic} alt="" />
                </div>
</div>
              

              
              </div>
            ))}
        </div>
      </div>
    );
  }
}

function AdminHome() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function checkAuth() {
    if (username.length < 6) {
      alert("username should be greater than 6");
      return;
    }
    if (pass.length < 6) {
      alert("password should be greater than 6");
      return;
    }
    if (username !== "user-admin") {
      alert("incorrect username");
      return;
    }
    if (pass !== "admin56667") {
      alert("incorrect password");
      return;
    }

    setAuth(true);
  }

  return (
    <div className="bg-[#0A1048] flex items-center justify-center h-[100vh] w-[100vw] overflow-hidden">
      {!auth ? (
        <div className="w-[30vw] h-[40vh] bg-white rounded-md flex items-center justify-center px-10 flex-col gap-2">
          <h1 className="font-bold text-xl">Welcome to Admin Dashboard</h1>
          <p className="text-md">Enter your admin credentials</p>
          <input
            type="text"
            className="bg-zinc-100 w-full p-2 rounded-md mt-5"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="bg-zinc-100 w-full p-2 rounded-md"
              placeholder="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              className="absolute right-3 top-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                </svg>
              )}
            </button>
          </div>
          <button
            className="bg-[#0A1048] rounded-md text-white px-7 py-2 text-md mt-5"
            onClick={() => {
              checkAuth();
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <AdminPages />
      )}
    </div>
  );
}

export default AdminHome;
