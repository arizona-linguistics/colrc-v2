export const path_role_permissions = {
    '/admin': ['manager', 'update'],
    '/userlist': ['manager'],
    '/edituser': ['manager'],
    '/adduser': ['manager'],
    '/users': ['manager', 'update', 'view'],
    '/userprofile': ['manager', 'update', 'view'],
    '/addaffix': ['manager','update'],
    '/editaffix': ['manager','update'],
    '/deleteaffix': ['manager', 'update'],
    '/addroot': ['manager', 'update'],
    '/editroot': ['manager', 'update'],
    '/deleteroot': ['manager', 'update'],
    '/affixhistory': ['manager', 'update'],
    '/roothistory': ['manager', 'update'],
    '/deletetext': ['manager, update'],
    '/edittext': ['manager, update'],
    '/texthistory': ['manager, update'],
    '/elicitationhistory': ['manager', 'update'],
    '/addstem': ['manager', 'update'],
    '/editstem': ['manager', 'update'],
    '/deletestem': ['manager', 'update'],
    '/stemhistory': ['manager', 'update'],
    '/elicitations': ['manager', 'update'],
    '/editelicitation': ['manager', 'update'],
    '/log': ['manager', 'update'],
    '/home' : ['*'],
}

export const path_role_field_permissions = {
    '/spelling': {
        'all_fields': ['root', 'reichard', 'english', 'doak'],
        'view': ['root', 'reichard', 'english']
    }
}