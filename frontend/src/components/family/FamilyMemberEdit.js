import { useState, useEffect } from "react";
import axios from "axios";
import FamilyMemberList from "./FamilyMemberList";
import { useAppSelector } from "../../app/hooks";

const FamilyMemberEdit = () => {

  const token = useAppSelector((state) => state.token.access);
  const familyId = useAppSelector((state) => state.family.id);


  useEffect(() => {
    axios({
      method: "get",
      url: `https://k7b103.p.ssafy.io/api/v1/family/${familyId}/`,
      headers: {
        Authorization: `Bearer ${token}`
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
