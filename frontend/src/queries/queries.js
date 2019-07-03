import { gql } from 'apollo-boost';

const getStemsQuery = gql`
  {
    stems_Q {
      id
      category
      reichard
      doak
      salish
      nicodemus
      english
      note
      active
      prevId
      user {
        username
      }
    }
  }
`;

const getUserToken = gql`
  query($email: String!, $password: String!) {
    loginUser_Q(email: $email, password: $password) {
      password
    }
  }
`;

const getAffixesQuery = gql`
  {
    affixes_Q {
      id
      type
      salish
      nicodemus
      english
      link
      page
      active
      prevId
      user {
        username
      }
    }
  }
`;

const getUsersQuery = gql`
  {
    users_Q {
      id
      first
      last
      username
      password
      email
      roles
    }
  }
`;

const getRootsQuery = gql`
  {
    roots_Q {
      id
      root
      number
      salish
      nicodemus
      english
      active
      prevId
      user {
        username
      }
    }
  }
`;

const addStemMutation = gql`
  mutation($category: String!, $reichard: String!, $doak: String!, $salish: String!, $nicodemus: String!, $english: String!, $note: String!) {
  	addStem_M(category: $category, reichard: $reichard, doak: $doak, salish: $salish, nicodemus: $nicodemus, english: $english, note: $note) {
      id
      category
      reichard
      doak
      salish
      nicodemus
      english
      note
      active
      prevId
      user {
        username
      }
    }
  }
`;

const updateStemMutation = gql`
  mutation($id: ID!, $category: String!, $reichard: String!, $doak: String!, $salish: String!, $nicodemus: String!, $english: String!, $note: String!) {
    updateStem_M(id: $id, category: $category, reichard: $reichard, doak: $doak, salish: $salish, nicodemus: $nicodemus, english: $english, note: $note) {
      id
      category
      reichard
      doak
      salish
      nicodemus
      english
      note
      active
      prevId
      user {
        username
      }
    }
  }
  `;

const deleteStemMutation = gql`
  mutation($id: ID!) {
    deleteStem_M(id: $id) {
      id
      category
      reichard
      doak
      salish
      nicodemus
      english
      note
      active
      prevId
      user {
        username
      }
    }
  }
`;

const addAffixMutation = gql`
  mutation($type: String!, $salish: String!, $nicodemus: String!, $english: String!, $link: String!, $page: String!) {
    addAffix_M(type: $type, salish: $salish, nicodemus: $nicodemus, english: $english, link: $link, page: $page) {
      id
      type
      salish
      nicodemus
      english
      link
      page
      active
      prevId
      user {
        username
      }
    }
  }
`;

const updateAffixMutation = gql`
  mutation($id: ID!, $type: String!, $salish: String!, $nicodemus: String!, $english: String!, $link: String!, $page: String!) {
    updateAffix_M(id: $id, type: $type, salish: $salish, nicodemus: $nicodemus, english: $english, link: $link, page: $page) {
      	id
      	type
      	salish
      	nicodemus
      	english
	  	  link
	      page
        active
        prevId
        user {
       		username
      }
    }
  }
`;

const deleteAffixMutation = gql`
  mutation($id: ID!) {
    deleteAffix_M(id: $id) {
      id
      type
      salish
      nicodemus
      english
      link
      page
      active
      prevId
      user {
        username
      }
    }
  }
`;

const addUserMutation = gql`
  mutation($first: String!, $last: String!, $username: String!, $email: String!, $password: String!, $roles: String!) {
    addUser_M(first: $first, last: $last, username: $username, email: $email, password: $password, roles: $roles) {
      id
      first
      last
      username
      email
      password
      roles
    }
  }
`;

const addRootMutation = gql`
  mutation($root: String!, $number: Int!, $salish: String!, $nicodemus: String!, $english: String!) {
    addRoot_M(root: $root, number: $number, salish: $salish, nicodemus: $nicodemus, english: $english) {
      id
      root
      number
      salish
      nicodemus
      english
      active
      prevId
      user {
        username
      }
    }
  }
`;

const updateRootMutation = gql`
  mutation($id: ID!, $root: String!, $number: Int!, $salish: String!, $nicodemus: String!, $english: String!) {
    updateRoot_M(id: $id, root: $root, number: $number, salish: $salish, nicodemus: $nicodemus, english: $english) {
      id
      root
      number
      salish
      nicodemus
      english
      active
      prevId
      user {
        username
      }
    }
  }
`;

const deleteRootMutation = gql`
  mutation($id: ID!) {
    deleteRoot_M(id: $id) {
      id
      root
      number
      salish
      nicodemus
      english
      active
      prevId
      user {
        username
      }
    }
  }
`;

const getUserQuery = gql`
  query($id: ID) {
    user_Q(id: $id) {
      id
      first
      last
      username
      email
      password
      roles
    }
  }
`;

const getRootQuery = gql`
  query($id: ID) {
    root_Q(id: $id) {
      id
      root
      number
      salish
      nicodemus
      english
      active
      prevId
      user {
        username
      }
    }
  }
`;

export { getUserToken, getStemsQuery, addStemMutation, deleteStemMutation, updateStemMutation, getAffixesQuery, addAffixMutation, deleteAffixMutation, updateAffixMutation, getUsersQuery, getRootsQuery, getUserQuery, getRootQuery, addUserMutation, addRootMutation, updateRootMutation, deleteRootMutation };
