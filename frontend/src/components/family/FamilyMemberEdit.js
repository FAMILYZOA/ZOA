import { useState, useEffect } from "react";
import axios from "axios";
import FamilyMemberList from "./FamilyMemberList";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

const FamilyMemberEdit = () => {
  
  
  const token = useAppSelector((state) => state.token.access);
  const navigate = useNavigate();
  useEffect (()=> {
    if (token.length === 0) {
      navigate("/intro");
    }
  });
  
  const familyId = useAppSelector((state) => state.family.id);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACK_HOST}/family/${familyId}/`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      setUsers([...res.data.users])
    })
  }, [familyId, users]);


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
