import { useEffect, useState } from "react";
import axios from "axios";
import ScrumFamItem from "./ScrumFamItem";

const ScrumFamList = () => {

    const [famScrum, setFamScrum] = useState([]);

    useEffect(() => {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_BACK_HOST}/scrums`,
        //   headers: {
        //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3MjIyMTgxLCJpYXQiOjE2NjcxMzU3ODEsImp0aSI6IjdjYzJjNzQxNGM2NzQ4NTJhODUwM2YxZjA5ZWJjZmQ4IiwidXNlcl9pZCI6MjJ9.sYu0f1nB9shYD9KY1AKR0GPynCxQNCl4xRururBIO5w'
        //   },
        })
        .then((res) => {
          setFamScrum([...res.data]);
        })
      }, []);

    return (
        <>
            {famScrum.map((item, id) => (
                <ScrumFamItem
                    {...item}
                    key={id}
                />
            ))}
        </>
    )
};

export default ScrumFamList;