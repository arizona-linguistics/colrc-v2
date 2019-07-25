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
      editnote
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

const getUserFromToken = gql`
  query {
    getUserFromToken_Q {
      id
      username
      first
      last
      email
      roles
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
      editnote
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
      editnote
      active
      prevId
      user {
        username
      }
    }
  }
`;

const getBibliographiesQuery = gql`
{
  bibliographies_Q {
    id
    author
    year
    title
    reference
    link
    linktext
    active
    prevId
    user {
      username
    }
  }
}
`;

const getBibliographyQuery = gql`
  query($id: ID) {
    bibliography_Q(id: $id) {
      id
      author
      year
      title
      reference
      link
      linktext
      active
      prevId
      user {
        username
      }
    }
  }
`;

const addStemMutation = gql`
  mutation($category: String, $reichard: String, $doak: String, $salish: String, $nicodemus: String!, $english: String!, $note: String, $editnote: String) {
  	addStem_M(category: $category, reichard: $reichard, doak: $doak, salish: $salish, nicodemus: $nicodemus, english: $english, note: $note, editnote: $editnote) {
      id
      category
      reichard
      doak
      salish
      nicodemus
      english
      note
      editnote
      active
      prevId
      user {
        username
      }
    }
  }
`;

const updateStemMutation = gql`
  mutation($id: ID!, $category: String, $reichard: String, $doak: String, $salish: String, $nicodemus: String!, $english: String!, $note: String, $editnote: String) {
    updateStem_M(id: $id, category: $category, reichard: $reichard, doak: $doak, salish: $salish, nicodemus: $nicodemus, english: $english, note: $note, editnote: $editnote) {
      id
      category
      reichard
      doak
      salish
      nicodemus
      english
      note
      editnote
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
      editnote
      active
      prevId
      user {
        username
      }
    }
  }
`;

const addAffixMutation = gql`
  mutation($type: String, $salish: String, $nicodemus: String!, $english: String!, $link: String, $page: String, $editnote: String) {
    addAffix_M(type: $type, salish: $salish, nicodemus: $nicodemus, english: $english, link: $link, page: $page, editnote: $editnote) {
      id
      type
      salish
      nicodemus
      english
      link
      page
      editnote
      active
      prevId
      user {
        username
      }
    }
  }
`;

const addBibliographyMutation = gql`
  mutation($author: String, $year: String, $title: String!, $reference: String, $link: String, $linktext: String ) {
    addBibliography_M(author: $author, year: $year, title: $title, reference: $reference, link: $link, linktext: $linktext ) {
      id
      author
      year
      title
      reference
      link
      linktext
      active
      prevId
      user {
        username
      }
    }
  }
`;

const updateAffixMutation = gql`
  mutation($id: ID!, $type: String, $salish: String, $nicodemus: String!, $english: String!, $link: String, $page: String, $editnote: String) {
    updateAffix_M(id: $id, type: $type, salish: $salish, nicodemus: $nicodemus, english: $english, link: $link, page: $page, editnote: $editnote) {
      	id
      	type
      	salish
      	nicodemus
      	english
	  	  link
	      page
        editnote
        active
        prevId
        user {
       		username
      }
    }
  }
`;

const updateBibliographyMutation = gql`
      mutation($id: ID!, $author: String, $year: String, $title: String!, $reference: String, $link: String, $linktext: String ) {
    updateBibliography_M(id:$id, author: $author, year: $year, title: $title, reference: $reference, link: $link, linktext: $linktext ) {
      id
      author
      year
      title
      reference
      link
      linktext
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
      editnote
      active
      prevId
      user {
        username
      }
    }
  }
`;

const deleteBibliographyMutation = gql`
  mutation($id: ID!) {
    deleteBibliography_M(id: $id) {
      id
      author
      year
      title
      reference
      link
      linktext
      active
      prevId
      user {
        username
      }
    }
  }
`;

const addUserMutation = gql`
  mutation($first: String!, $last: String!, $username: String!, $email: String!, $password: String!) {
    addUser_M(first: $first, last: $last, username: $username, email: $email, password: $password) {
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

const updateUserMutation = gql`
  mutation($first: String!, $last: String!, $username: String!, $email: String!, $password: String!) {
    updateUser_M(first: $first, last: $last, username: $username, email: $email, password: $password) {
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

const updateUserAdminMutation = gql`
  mutation($id: ID!, $roles: [String!]!) {
    updateUserAdmin_M(id: $id, roles: $roles) {
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
  mutation($root: String!, $number: Int, $salish: String, $nicodemus: String!, $english: String!, $editnote: String) {
    addRoot_M(root: $root, number: $number, salish: $salish, nicodemus: $nicodemus, english: $english, editnote: $editnote) {
      id
      root
      number
      salish
      nicodemus
      english
      editnote
      active
      prevId
      user {
        username
      }
    }
  }
`;

const updateRootMutation = gql`
  mutation($id: ID!, $root: String!, $number: Int, $salish: String, $nicodemus: String!, $english: String!, $editnote: String) {
    updateRoot_M(id: $id, root: $root, number: $number, salish: $salish, nicodemus: $nicodemus, english: $english, editnote: $editnote) {
      id
      root
      number
      salish
      nicodemus
      english
      editnote
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
      editnote
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
      editnote
      prevId
      user {
        username
      }
    }
  }
`;

export { getUserToken, getUserFromToken, getStemsQuery, addStemMutation, deleteStemMutation, updateStemMutation, getAffixesQuery, addAffixMutation, deleteAffixMutation, updateAffixMutation, getUsersQuery, getRootsQuery, getUserQuery, getRootQuery, addUserMutation, updateUserMutation, updateUserAdminMutation, addRootMutation, updateRootMutation, deleteRootMutation, getBibliographiesQuery, getBibliographyQuery, addBibliographyMutation, deleteBibliographyMutation, updateBibliographyMutation };
