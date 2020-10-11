import React, { useEffect, useState } from 'react';

import { getAllMachines } from '../service/machine';
const ListMachines = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getAllMachines().then(res => {
      console.log(res);
      setData(res);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default ListMachines;