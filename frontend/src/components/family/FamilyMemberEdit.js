import { useState, useEffect } from "react";
import axios from "axios";
import FamilyMemberList from "./FamilyMemberList";

const FamilyMemberEdit = () => {

  useEffect(() => {
    axios({
      method: "get",
      url: 'https://k7b103.p.ssafy.io/api/v1/family/5/',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3MTk2MjAxLCJpYXQiOjE2NjcxMDk4MDEsImp0aSI6ImZhYmY4OTA4YmI0NjRkZGY4YWMxZTFmYTM2ZjAwYzg4IiwidXNlcl9pZCI6MjJ9.10bBY_OlYzH9K4Ct35oelsEBCZrmlnawsiBsqDVNFNU'
      },
    })
    .then((res) => {
      setUsers([...res.data.users])
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  const [users, setUsers] = useState([]);

return (
  <>
   {users.map((item, id) => (
     <FamilyMemberList
       {...item}
       key={id}
     />
   ))}
 </>
);
};

export default FamilyMemberEdit;
