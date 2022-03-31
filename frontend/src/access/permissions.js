export const path_role_permissions = {
    '/admin': ['manager', 'update'],
    '/userlist': ['manager'],
    '/edituser': ['manager'],
    '/adduser': ['manager'],
    // '/users': ['manager', 'update', 'view'],
    '/userprofile': ['manager', 'update', 'view'],
    '/addaffix': ['manager','update'],
    '/editaffix': ['manager','update'],
    '/deleteaffix': ['manager', 'update'],
    '/addroot': ['manager', 'update'],
    '/editroot': ['manager', 'update'],
    '/deleteroot': ['manager', 'update'],
    '/affixhistory': ['manager', 'update'],
    '/roothistory': ['manager', 'update'],
    '/elicitationhistory': ['manager', 'update'],
    '/addstem': ['manager', 'update'],
    '/editstem': ['manager', 'update'],
    '/deletestem': ['manager', 'update'],
    '/stemhistory': ['manager', 'update'],
    '/elicitations': ['manager', 'update'],
    '/editelicitation': ['manager', 'update'],
    '/log': ['manager', 'update'],
    '/managetypes': ['manager', 'update'],   
    '/metadatalexicon': ['manager', 'update'],
    '/buildmetadata': ['manager', 'update'],
    '/buildmetadatatypes': ['manager', 'update'],
    '/upload' : ['manager', 'update'],
    '/home' : ['*'],
}

export const path_odinson_permissions = {
    'searchResults': ['manager', 'update']
}

export const path_button_permissions = {
    'adminUsers': ['manager'],
    'adminNav': ['manager', 'update'],
    'users':  ['manager', 'update', 'view']
}

export const path_role_field_permissions = {
    '/spelling': {
        'all_fields': ['root', 'reichard', 'english', 'doak'],
        'view': ['root', 'reichard', 'english']
    }
}