import React, { useState } from "react";
import { testService } from '../../../../redux/test/saga';
import { useEffect } from "react";

const UserView = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");

  const fetchUser = async () => {
    setLoading(true);

    try {
      const response = await testService.fetchtest();
      setUser(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    setLoading(true);

    try {
      await testService.deletetest();
      setUser(null); // Clear user data after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    setLoading(true);

    try {
      const response = await testService.updatetest();
      setUser(response);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  }

  function test(){
  console.log(name);
  if(true){
    var name="ram"
  }
}

  useEffect(() => {
    // Fetch user details when the component mounts
    fetchUser();
    
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Details</h2>

      {/* Button */}
      <button style={styles.button} onClick={fetchUser}>
        Get User Details
      </button>

      {loading && <div style={{ marginTop: "20px" }}>Loading...</div>}

      {/* Show Data */}
      <div>
        <input style={{ marginTop: "20px", padding: "10px", width: "300px" }}
          type="text"
          placeholder="Enter new name"
          onChange={e => setNewName(e.target.value)}
        />
        <p>Hello, {newName}</p>
      </div>
      {user && (
        <div style={styles.card}>
          <div style={styles.row}>
            <span style={styles.label}>Name:</span>
            <span>{user?.name}</span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Email:</span>
            <span>{user?.email}</span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Role:</span>
            <span>{user?.role}</span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Created Date:</span>
            <span>{user?.createdDate}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    background: "#f5f7fb",
    minHeight: "100vh"
  },
  title: {
    marginBottom: "20px",
    fontWeight: "600"
  },
  button: {
    padding: "10px 20px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500"
  },
  card: {
    marginTop: "20px",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    maxWidth: "500px"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee"
  },
  label: {
    fontWeight: "600",
    color: "#555"
  }
};

export default UserView;