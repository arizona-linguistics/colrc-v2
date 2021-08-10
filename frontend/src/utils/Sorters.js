import React from 'react';

  //define a custom sort for roles
 export const customRoleSort = (rowA, rowB, columnId, desc) => {
    //console.log(rowA.values[columnId][0].role.role_code)
    const defaultVal = desc ? 'AAAAAAAAAAAA' : 'ZZZZZZZZ';
    return (rowA.values[columnId][0] ? rowA.values[columnId][0].role.role_code : defaultVal)
      .localeCompare(rowB.values[columnId][0] ? rowB.values[columnId][0].role.role_code : defaultVal);
  };

 export const sortTypes = {
    customRoleSort: customRoleSort,
  };
  