import { gql } from 'apollo-boost';

// Queries

// captcha

export const isHuman = gql`
  query($token: String!) {
    isHuman_Q(token: $token) {
      token
    }
  }
`;

// getAffixes

export const getAffixesQuery = gql`
  query getAffixesQuery($limit: Int, $offset: Int, $affix_order: [affixes_order_by!], $where: affixes_bool_exp) {
    affixes_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    affixes(limit: $limit, offset: $offset, where: $where, order_by: $affix_order) {
      english
      nicodemus
      createdAt
      editnote
      link
      page
      salish
      affix_type {
        value
        id
      }
      updatedAt
      id
      user {
        username
        id
      }
    }
  }
  `;

  export const getAllAffixesQuery = gql`
  query getAffixesQuery($affix_order: [affixes_order_by!], $offset: Int = 0, $where: affixes_bool_exp) {
    affixes_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    affixes(offset: $offset, where: $where, order_by: $affix_order) {
      english
      nicodemus
      createdAt
      editnote
      link
      page
      salish
      affix_type {
        value
        id
      }
      updatedAt
      id
      user {
        username
        id
      }
    }
  }
  `;


export const getAnonAffixesQuery = gql`
  query getAnonAffixesQuery($limit: Int, $offset: Int, $affix_order: [affixes_order_by!], $where: affixes_bool_exp) {
    affixes_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    affixes(limit: $limit, offset: $offset, where: $where, order_by: $affix_order) {
      english
      nicodemus
      createdAt
      link
      page
      salish
      affix_type {
        value
        id
      }
      updatedAt
      id
    }
  }
  `;

export const getAffixByIdQuery = gql`
  query GetAffixById($id: Int!) {
    affixes_by_pk(id: $id) {
      editnote
      createdAt
      id
      english
      link
      nicodemus
      page
      salish
      updatedAt
      user {
        username
        id
      }
      affix_type {
        id
        value
      }
    }
  }
`;

export const getAffixTypesQuery = gql`
  query {
    affix_types {
      value
      id
    }
  }
`;

export const getAffixHistoryByIdQuery = gql`
  query getAffixHistoryById($row_data: jsonb!, $table_name: String!) {
    audit_logged_actions(where: {table_name: {_eq: $table_name}, row_data: {_contains: $row_data}}, order_by: {action_tstamp_clk: asc})  {
      action
      action_tstamp_clk
      action_tstamp_stm
      action_tstamp_tx
      application_name
      changed_fields
      client_addr
      client_port
      client_query
      event_id
      hasura_user
      relid
      row_data
      schema_name
      session_user_name
      statement_only
      table_name
      transaction_id
    }
  } 
`;

// getAudioSets

export const getAudioSetsQuery = gql`
  query getAudioSetsQuery($limit: Int, $offset: Int, $order: [audiosets_order_by!], $where: audiosets_bool_exp) {
    audiosets_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    audiosets(limit: $limit, offset: $offset, order_by: $order, where: $where) {
      id
      speaker
      title
      textId
      audiosets_audiofiles {
        audiosetId
        direct
        id
        src
        subdir
        type
        audio_with_path
      }
      user {
        id
        last
        first
        username
      }
      text {
        cycle
        id
        speaker
        rnumber
        title
        tnumber
      }
    }
  }
`;

export const getAudioSetById = gql`
  query getAudioSetsByIdQuery($id: Int) {
    audiosets(where: {id: {_eq: $id}}) {
        id
        speaker
        title
        textId
        audiosets_audiofiles {
          audiosetId
          direct
          id
          src
          subdir
          type
          audio_with_path
        }
      user {
        id
        last
        first
        username
      }
    }
  }
`;

// getBibliography

export const getBibliographyQuery = gql `
  query getBibliographyQuery($limit: Int, $offset: Int, $bibliographies_order: [bibliographies_order_by!], $where: bibliographies_bool_exp) {
    bibliographies_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    bibliographies(limit: $limit, offset: $offset, where: $where, order_by: $bibliographies_order) {
      author
      year
      title
      reference
      link
      linktext
      createdAt
      updatedAt
      id
    }
  }
`;

// getElicitationSets

export const getElicitationSetsQuery = gql`
  query getElicitationsetsQuery($limit: Int, $offset: Int, $order: [elicitationsets_order_by!], $where: elicitationsets_bool_exp) {
    elicitationsets_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    elicitationsets(limit: $limit, offset: $offset, order_by: $order, where: $where) {
      editnote
      id
      language
      speaker
      prompt
      transcription
      user {
        email
        first
        id
        last
      }
      elicitationfiles {
        direct
        elicitationSetId
        elicitationfiles_with_path
        id
        src
        type
      }
    }
  }
`;

export const getElicitationSetByIdQuery = gql`
  query GetElicitationById($id: Int!) {
    elicitationsets_by_pk(id: $id) {
      id
      language
      prompt
      speaker
      transcription
    }
  }
`;

export const getElicitationSetHistoryByIdQuery = gql`
  query getElicitationSetHistoryById($row_data: jsonb!, $table_name: String!) {
    audit_logged_actions(where: {table_name: {_eq: $table_name}, row_data: {_contains: $row_data}}, order_by: {action_tstamp_clk: asc})  {
      action
      action_tstamp_clk
      action_tstamp_stm
      action_tstamp_tx
      application_name
      changed_fields
      client_addr
      client_port
      client_query
      event_id
      hasura_user
      relid
      row_data
      schema_name
      session_user_name
      statement_only
      table_name
      transaction_id
    }
  } 
`;

// getLogs

export const getLogQuery = gql`
  query getLogQuery($limit: Int, $offset: Int, $log_order: [audit_logged_actions_order_by!], $where: audit_logged_actions_bool_exp) {
    audit_logged_actions_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    audit_logged_actions(limit: $limit, offset: $offset, where: $where, order_by: $log_order) {
      action
      changed_fields
      hasura_user
      row_data
      schema_name
      table_name
      audit_user {
        id
        email
        first
        last
        username
      }
    }
  }
`;

// getMetadata

export const getMetadataLexiconQuery = gql `
  query getMetadataLexicon {
    metadata_lexicon {
      code
      code_table
      comment
      definition
      id
      label
      type
      validation
    }
  }
`;

export const getMetadataTypesQuery = gql `
  query MetadataTypes {
    metadata_type {
      fields
      id
      name
    }
  }
`;

export const getMetadataQuery = gql `
  query Metadata($textFileId: Int!) {
    textfilemetadata(where: {textFileId: {_eq: $textFileId}}) {
      createdAt
      id
      metadata
      textFileId
      textfile {
        createdAt
        fileType
        id
        msType
        resType
        src
        subdir
        textId
        textfile_with_path
      }
    }
  }
`;

// getRoots
export const getRootsQuery = gql`
  query getRootsQuery($where: roots_bool_exp = {}, $limit: Int = 10, $offset: Int = 0, $root_order: [roots_order_by!] = {}) {
    roots_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    roots(where: $where, limit: $limit, offset: $offset, order_by: $root_order) {
      cognate
      createdAt
      crossref
      editnote
      english
      grammar
      id
      nicodemus
      number
      root
      salish
      sense
      symbol
      updatedAt
      variant
      user {
        username
        id
      }
    }
  }
  `;

  export const getAllRootsQuery = gql`
    query getRootsQuery($where: roots_bool_exp = {}, $offset: Int = 0, $root_order: [roots_order_by!] = {}) {
      roots_aggregate(where: $where) {
        aggregate {
          count
        }
      }
      roots(where: $where, offset: $offset, order_by: $root_order) {
        cognate
        createdAt
        crossref
        editnote
        english
        grammar
        id
        nicodemus
        number
        root
        salish
        sense
        symbol
        updatedAt
        variant
        user {
          username
          id
        }
      }
    }
  `;

export const getRootHistoryByIdQuery = gql`
  query getRootHistoryById($row_data: jsonb!, $table_name: String!) {
    audit_logged_actions(where: {table_name: {_eq: $table_name}, row_data: {_contains: $row_data}}, order_by: {action_tstamp_clk: asc})  {
      action
      action_tstamp_clk
      action_tstamp_stm
      action_tstamp_tx
      application_name
      changed_fields
      client_addr
      client_port
      client_query
      event_id
      hasura_user
      relid
      row_data
      schema_name
      session_user_name
      statement_only
      table_name
      transaction_id
    }
  } 
`;

export const getBrowseRootQuery = gql `
  query BrowseRoot($where: roots_bool_exp!) {
    roots_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    roots(where: $where) {
      cognate
      createdAt
      crossref
      editnote
      english
      grammar
      id
      nicodemus
      number
      root
      salish
      sense
      symbol
      updatedAt
      userId
      variant
    }
  }
`;

export const getExactRootQuery = gql `
  query ExactRoot($root: String!) {
    roots(where: {root: {_ilike: $root}}) {
      cognate
      createdAt
      crossref
      editnote
      english
      grammar
      id
      nicodemus
      number
      root
      salish
      sense
      symbol
      updatedAt
      userId
      variant
    }
  }
`;

export const getRootByIdQuery = gql`
  query GetRootById($id: Int!) {
    roots_by_pk(id: $id) {
      editnote
      createdAt
      updatedAt
      id
      english
      grammar
      nicodemus
      number
      root
      salish
      sense
      symbol
      crossref
      cognate
      variant
      user {
        username
        id
      }
    }
  }
`;

export const getAnonRootsQuery = gql`
  query getAnonRootsQuery($where: roots_bool_exp = {}, $limit: Int = 10, $offset: Int = 10, $root_order: [roots_order_by!] = {}) {
    roots_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    roots(where: $where, limit: $limit, offset: $offset, order_by: $root_order) {
      cognate
      createdAt
      crossref
      editnote
      english
      grammar
      id
      nicodemus
      number
      root
      salish
      sense
      symbol
      updatedAt
      variant
    }
  }
`;

// export const getRootHistoryByIdQuery = gql`
//   query getRootHistoryById($row_data: jsonb!, $table_name: String!) {
//     audit_logged_actions(where: {table_name: {_eq: $table_name}, row_data: {_contains: $row_data}}, order_by: {action_tstamp_clk: asc})  {
//       action
//       action_tstamp_clk
//       action_tstamp_stm
//       action_tstamp_tx
//       application_name
//       changed_fields
//       client_addr
//       client_port
//       client_query
//       event_id
//       hasura_user
//       relid
//       row_data
//       schema_name
//       session_user_name
//       statement_only
//       table_name
//       transaction_id
//     }
//   } 
// `;

// export const getBrowseRootQuery = gql `
//   query BrowseRoot($where: roots_bool_exp!) {
//     roots_aggregate(where: $where) {
//       aggregate {
//         count
//       }
//     }
//     roots(where: $where) {
//       cognate
//       createdAt
//       crossref
//       editnote
//       english
//       grammar
//       id
//       nicodemus
//       number
//       root
//       salish
//       sense
//       symbol
//       updatedAt
//       userId
//       variant
//     }
//   }
// `;

// export const getExactRootQuery = gql `
//   query ExactRoot($root: String!) {
//     roots(where: {root: {_ilike: $root}}) {
//       cognate
//       createdAt
//       crossref
//       editnote
//       english
//       grammar
//       id
//       nicodemus
//       number
//       root
//       salish
//       sense
//       symbol
//       updatedAt
//       userId
//       variant
//     }
//   }
// `;

// getStems

export const getStemsQuery = gql`
  query getStemsQuery($where: stems_bool_exp = {}, $limit: Int = 10, $offset: Int = 10, $stem_order: [stems_order_by!] = {}) {
    stems_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    stems(where: $where, limit: $limit, offset: $offset, order_by: $stem_order) {
      createdAt
      editnote
      english
      id
      nicodemus
      salish
      updatedAt
      user {
        username
        id
      }
      reichard
      note
      doak
      stem_category {
        id
        value
      }
    }
  }
`;

export const getAllStemsQuery = gql`
  query getStemsQuery($where: stems_bool_exp = {}, $offset: Int = 0, $stem_order: [stems_order_by!] = {}) {
    stems_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    stems(where: $where, offset: $offset, order_by: $stem_order) {
      createdAt
      editnote
      english
      id
      nicodemus
      salish
      updatedAt
      user {
        username
        id
      }
      reichard
      note
      doak
      stem_category {
        id
        value
      }
    }
  }
`;
  
export const getAnonStemsQuery = gql`
  query getAnonStemsQuery($where: stems_bool_exp = {}, $limit: Int = 10, $offset: Int = 10, $stem_order: [stems_order_by!] = {}) {
    stems_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    stems(where: $where, limit: $limit, offset: $offset, order_by: $stem_order) {
      createdAt
      editnote
      english
      id
      nicodemus
      salish
      updatedAt
      reichard
      note
      doak
      stem_category {
        id
        value
      }
    }
  }
`;

export const getStemByIdQuery = gql`
  query GetStemById($id: Int!) {
    stems_by_pk(id: $id) {
      editnote
      createdAt
      id
      english
      doak
      nicodemus
      salish
      updatedAt
      user {
        username
        id
      }
      stem_category {
        id
        value
      }
    }
  }
`;

export const getStemCategoriesQuery = gql`
  query {
    stem_categories {
      value
      id
    }
  }
`;

// getTexts

export const getTextsById = gql`
  query getTextByIdQuery($id: Int) {
    texts(where: {id: {_eq: $id}}) {
      id
      title
      speaker
      cycle
      rnumber
      tnumber
      audiosets {
        id
        speaker
        title
        textId
        audiosets_audiofiles {
          audiosetId
          direct
          id
          src
          subdir
          type
          audio_with_path
        }
      }
      texts_textfiles {
        fileType
        id
        msType
        resType
        src
        subdir
        textId
        textfile_with_path
        textimages {
          id
          src
          subdir
          textimage_with_path
          textFileId
        }
      }
      user {
        id
        last
        first
        username
      }
    }
  }
`;

export const getTextsQuery = gql`
  query getTextsQuery($limit: Int, $offset: Int, $order: [texts_order_by!], $where: texts_bool_exp) {
    texts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    texts(limit: $limit, offset: $offset, order_by: $order, where: $where) {
      id
      title
      speaker
      cycle
      rnumber
      tnumber
      audiosets {
        id
        speaker
        title
        textId
        audiosets_audiofiles {
          audiosetId
          direct
          id
          src
          subdir
          type
          audio_with_path
        }
      }
      texts_textfiles {
        fileType
        id
        msType
        resType
        src
        subdir
        textId
        textfile_with_path
        textfilemetadata {
          metadata
          textFileId
        }
        textimages {
          id
          src
          subdir
          textimage_with_path
          textFileId
        }
      }
      user {
        id
        last
        first
        username
      }
    }
  } 
`;

// getUsers

export const getUserByIdQuery = gql`
query getUserByID($id: Int!) {
  users_by_pk(id: $id) {
    createdAt
    email
    first
    id
    last
    password
    updatedAt
    username
    user_roles {
      role {
        id
        role_code
        role_value
      }
    }
  }
}`;

export const getUsersQuery = gql`
query getUsersQuery($limit: Int, $offset: Int) {
  users(limit: $limit, offset: $offset) {
    id
    first
    last
    username
    password
    email
    createdAt
    updatedAt
    user_roles {
      createdAt
      roleId
      updatedAt
      userId
      role {
        role_value
        role_code
        id
      }
    }
  }
}
`;

export const getUsernamesQuery = gql`
  query {
    users {
      username
      id
    }
  }
`;

export const getUserToken = gql`
  query($email: String!, $password: String!) {
    loginUser_Q(email: $email, password: $password) {
      password
    }
  }
`;

export const getUserFromToken = gql`
  query {
    getUserFromToken_Q {
      id
      username
      first
      last
      email
      password
      roles {
        role_code
        id
      }
    }
  }
`;

export const getRolesQuery = gql `
  query {
    roles {
      id
      role_value
      role_code
    }
  }
`;

// getSpellings

export const getSpellingListQuery = gql`
  query getSpellingListQuery($limit: Int, $offset: Int, $spellings_order: [spellings_order_by!], $where: spellings_bool_exp) {
    spellings_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    spellings(limit: $limit, offset: $offset, where: $where, order_by: $spellings_order) {
      english
      nicodemus
      createdAt
      id
      note
      reichard
      salish
      updatedAt
      id
    }
  }
`;

export const getConsonantsQuery = gql `
  query getConsonantsQuery($limit: Int, $offset: Int, $consonant_order: [consonants_order_by!], $where: consonants_bool_exp) {
    consonants_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    consonants(limit: $limit, offset: $offset, where: $where, order_by: $consonant_order) {
      alveolar
      alveopalatal
      glottal
      labial
      lateral
      manner
      orthography
      palatal
      pharyngeal
      secondary
      uvular
      velar
      voice
      createdAt
      updatedAt
      id
    }
  }
`;

export const getVowelsQuery = gql `
  query getVowelsQuery($limit: Int, $offset: Int, $vowel_order: [vowels_order_by!], $where: vowels_bool_exp) {
    vowels_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    vowels(limit: $limit, offset: $offset, where: $where, order_by: $vowel_order) {
      orthography
      height
      front
      central
      back
      createdAt
      updatedAt
      id
    }
  }
`;

// Mutations - Insert

export const insertAffixMutation = gql`
  mutation insert_an_affix($editnote: String, $english: String!, $link: String, $nicodemus: String!, $page: String, $salish: String, $type: Int!) {
    insert_affixes_one(object: {editnote: $editnote, english: $english, link: $link, nicodemus: $nicodemus, page: $page, salish: $salish, type: $type}) {
      createdAt
      editnote
      english
      id
      link
      nicodemus
      page
      salish
      affix_type {
        value
        id
      }
      updatedAt
      userId
    }
  }
`;

export const insertRootMutation = gql`
  mutation insert_a_root($editnote: String!, $english: String!, $salish: String, $nicodemus: String!, $root: String!, $number: Int, $sense: String, $symbol: String, $grammar: String, $crossref: String, $variant: String, $cognate: String) {
    insert_roots_one(object: {editnote: $editnote, english: $english, salish: $salish, nicodemus: $nicodemus, root: $root, number: $number, sense: $sense, symbol: $symbol, grammar: $grammar, crossref: $crossref, variant: $variant, cognate: $cognate}) {
      createdAt
      editnote
      english
      id
      nicodemus
      salish
      root
      number
      sense
      symbol
      grammar
      crossref
      variant
      cognate
      updatedAt
      userId
    }
  }
`;

export const insertStemMutation = gql`
  mutation insert_a_stem($editnote: String!, $english: String!, $salish: String, $nicodemus: String!, $doak: String = "", $note: String = "", $reichard: String = "", $category: Int!) {
    insert_stems_one(object: {editnote: $editnote, english: $english, salish: $salish, nicodemus: $nicodemus, doak: $doak, note: $note, reichard: $reichard, category: $category}) {
      editnote
      english
      id
      nicodemus
      salish
      userId
      doak
      note
      reichard
      createdAt
      updatedAt
      stem_category {
        value
        id
      }
    }
  }
`;

export const insertUserMutation = gql `
  mutation insertUserMutation($email: String!, $first: String!, $last: String!, $username: String!, $password: String!) {
    insert_users_one(object: {first: $first, last: $last, password: $password, username: $username, email: $email}) {
      createdAt
      updatedAt
      first
      id
      last
      password
      username
      email
    }
  }
`;

export const insertUserRoleMutation = gql `
  mutation insertUserRoleMutation($userId: Int! $roleId: Int) {
    insert_user_roles_one(object: {userId: $userId, roleId: $roleId}) {
      createdAt
      updatedAt
      userId
      roleId
    }
  }
  `

  export const insertUserWithRoleMutation = gql `
  mutation insertUserWithRoles($first: String!, $last: String!, $username: String!, $password: String!, $email: String!, $user_roles: user_roles_arr_rel_insert_input) {
    insert_users(objects: [
      {
        first: $first,
        last: $last,
        email: $email,
        username: $username,
        password: $password,
        user_roles: $user_roles, 
      }]) {
      returning {
        username
        user_roles {
          role {
            role_value
          }
        }
      }
    }
  }
  `
 // Query variables for insertUserWithRoles"
 
  /*  {
    "first": "Gracie1",
    "last": "Ivens",
    "email": "gracie@a.com",
    "username":	"grace1",
    "password": "grace",
    "user_roles": {
    "data": [
          {
              "role": {
                  "data": {
                      "role_code": "update"
                  }, 
                  "on_conflict": {
                      "constraint": "roles_role_code_key",
                      "update_columns": ["role_code"]
                  } 
              }
          },
           {
              "role": {
                  "data": {
                      "role_code": "view"
                  }, 
                  "on_conflict": {
                      "constraint": "roles_role_code_key", 
                      "update_columns": ["role_code"]
                  }
              }
          }    
      ]
    }
  } */
  

// Mutations - update - in alpha order

export const updateAffixMutation = gql`
  mutation updateAnAffix($id: Int!, $editnote: String!, $english: String!, $salish: String!, $nicodemus: String!, $link: String!, $page: String!, $type: Int!){
    update_affixes_by_pk(pk_columns: {id: $id},
    _set: {
        english: $english,
        nicodemus: $nicodemus,
        editnote: $editnote,
        salish: $salish,
        link: $link,
        page: $page,
        type: $type
      }
    )
    {
      createdAt
      editnote
      english
      id
      link
      nicodemus
      page
      salish
      type
      updatedAt
      userId
    }
  }
`;

export const updateElicitationSetMutation = gql `
  mutation updateAnElicitation($id: Int!, $editnote: String!, $language: String!, $prompt: String!, $speaker: String!, $transcription: String!) {
    update_elicitationsets_by_pk(pk_columns: {id: $id},
      _set: {
        editnote: $editnote,
        language: $language,
        prompt: $prompt
        speaker: $speaker
        transcription: $transcription
      }
    )
    {
      createdAt
      editnote
      id
      language
      prompt
      transcription
      updatedAt
      userId
    }
  }
`

export const updateRootMutation = gql`
  mutation updateARoot($id: Int!, $editnote: String!, $english: String!, $salish: String, $nicodemus: String!, $root: String!, $number: Int, $sense: String, $symbol: String, $grammar: String, $crossref: String, $variant: String, $cognate: String){
    update_roots_by_pk(pk_columns: {id: $id},
    _set: {
        editnote: $editnote,
        english: $english,
        nicodemus: $nicodemus,
        salish: $salish,
        root: $root,
        number: $number,
        sense: $sense,
        symbol: $symbol,
        grammar: $grammar,
        crossref: $crossref,
        variant: $variant
      }
    )
    {
      createdAt
      editnote
      english
      id
      link
      nicodemus
      salish
      root
      number
      sense
      symbol
      grammar
      crossref
      variant
      updatedAt
      userId
    }
  }
`

export const updateStemMutation = gql`
  mutation updateAStem($id: Int!, $editnote: String!, $english: String!, $salish: String!, $nicodemus: String!, $doak: String!, $reichard: String!, $category: Int!){
    update_stems_by_pk(pk_columns: {id: $id},
    _set: {
        english: $english,
        nicodemus: $nicodemus,
        editnote: $editnote,
        salish: $salish,
        doak: $doak,
        reichard: $reichard,
        category: $category
      }
    )
    {
      createdAt
      editnote
      english
      id
      doak
      nicodemus
      reichard
      salish
      category
      updatedAt
      userId
    }
  }
`;

export const updateUserMutation = gql `
  mutation updateAUser($id: Int!, $first: String!, $last: String!, $username: String!, $email: String!) {
    update_users_by_pk (pk_columns: {id: $id},
      _set:  {
        first: $first,
        last: $last,
        username: $username,
        email: $email
      }
    )  
    {
      id,
      first,
      last,
      username,
      email,
      password,
      user_roles {
        role {
          id
          role_code
          role_value
        }     
      }
    }
  }
`;

export const updateUserPwdMutation = gql `
  mutation updateAUsersPwd ($id: Int!, $password: String!) {
    update_users_by_pk (pk_columns: {id: $id},
      _set:  {
        password: $password,
      }
    )  
    {
      id,
      first,
      last,
      username,
      email,
      password,
      user_roles {
        role {
          id
          role_code
          role_value
        }     
      }
    }
  }

`;

export const updateUserRolesMutation = gql`
  mutation updateUserRolesMutation($userId: Int!, $newRoles: [user_roles_insert_input!]! = []) {
    delete_user_roles(where: {userId: {_eq: $userId}}) {
      affected_rows
    }
    insert_user_roles(objects: $newRoles) {
      affected_rows
    }
  }
`

// Mutations - delete

export const deleteAffixMutation = gql`
  mutation($id: Int!) {
    delete_affixes_by_pk(id: $id) {
      id
    }
  }
`;

export const deleteRootMutation = gql`
  mutation($id: Int!) {
    delete_roots_by_pk(id: $id) {
      id
    }
  }
`;

export const deleteStemMutation = gql`
  mutation($id: Int!) {
    delete_stems_by_pk(id: $id) {
      id
    }
  }
`;

export const deleteUserRoleMutation = gql` 
  mutation deleteUserRoleMutation($userId: Int!, $roleId: Int!) {
    delete_user_roles_by_pk(userId: $userId, roleId: $roleId) {
      userId
      roleId
    }
  }
`;

export const deleteUserMutation = gql`
  mutation deleteUser($id: Int!) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`







