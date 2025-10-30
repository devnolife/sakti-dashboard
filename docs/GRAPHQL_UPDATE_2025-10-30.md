# GraphQL Schema Update - 2025-10-30

## 🔄 Breaking Changes

### 1. Authentication Mutation Renamed

**OLD (DEPRECATED):**
```graphql
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    access_token
  }
}
```

**NEW (CURRENT):**
```graphql
mutation Signin($loginUserInput: SigninUserInput!) {
  signin(loginUserInput: $loginUserInput) {
    access_token
    user {
      id
      username
      role
    }
  }
}
```

**Key Changes:**
- Mutation name: `login` → `signin`
- Input format: Direct arguments → Object `SigninUserInput`
- Response: Now includes `user` object with `id`, `username`, `role`

**Migration:**
```typescript
// OLD
const { data } = await executeGraphQLQuery(LOGIN, { 
  username, 
  password 
})

// NEW
const { data } = await executeGraphQLQuery(SIGNIN, { 
  loginUserInput: { 
    username, 
    password 
  } 
})
```

### 2. Profile Query Fields Updated

**OLD (DEPRECATED):**
```graphql
query {
  profile {
    username
    fullname      # ❌ REMOVED
    department    # ❌ REMOVED
    role
  }
}
```

**NEW (CURRENT):**
```graphql
query {
  profile {
    id            # ✅ NEW
    username
    name          # ✅ NEW (replaces fullname)
    email         # ✅ NEW
    phone         # ✅ NEW
    role
  }
}
```

**Key Changes:**
- Added: `id`, `email`, `phone`
- Renamed: `fullname` → `name`
- Removed: `department`

---

## 📊 Schema Statistics

| Metric | Old (2025-10-27) | New (2025-10-30) | Change |
|--------|------------------|------------------|--------|
| Total Queries | 43 | 47 | +4 |
| Total Mutations | 22 | 24 | +2 |
| Total Types | 36 | 39 | +3 |

---

## 🆕 New Queries Added

### 1. Dosen Queries
- `dosens` - Get all lecturers
- `dosensByName` - Search lecturers by name
- `dosenByEmail` - Get lecturer by email

### 2. KKP Queries
- `getAllApprovedMahasiswaStats` - Get approval statistics
- `getApprovalTimeline` - Get timeline of approvals

---

## 🆕 New Mutations Added

### KKP Instansi Bagian
- `updateKkpInstansiBagianApproval` - Update department approval
- `removeKkpInstansiBagianApproval` - Remove department approval

---

## 📝 Updated Files

### Core GraphQL Files
1. ✅ `lib/graphql/mutations-superapps.ts`
   - Updated `LOGIN` to use `SIGNIN`
   - Updated `GET_PROFILE` fields
   - Added backward compatibility alias

2. ✅ `lib/graphql/queries-superapps.ts`
   - Added dosen queries
   - Updated profile query fields
   - Updated header comment (47 queries)

3. ✅ `context/auth-context.tsx`
   - Updated `GraphQLSigninResponse` interface
   - Updated `GraphQLProfileResponse` interface
   - Changed mutation call to use `SIGNIN` with `loginUserInput`
   - Updated profile field mappings

4. ✅ `app/actions/auth-actions.ts`
   - Updated `SigninResponse` interface
   - Changed from `LOGIN` to `SIGNIN`
   - Updated variable structure

### Documentation
5. ✅ `docs/GRAPHQL_API_GUIDE.md` - Created comprehensive API guide
6. ✅ `docs/GRAPHQL_SUMMARY.json` - Updated with latest introspection
7. ✅ `docs/GRAPHQL_SCHEMA.json` - Full schema export

---

## 🧪 Testing

### Test Scripts Updated
- ✅ `scripts/test-signin-mutation.js` - Tests SIGNIN + PROFILE flow
- ✅ `scripts/introspect-signin-types.js` - Introspects signin types
- ✅ `scripts/introspect-userprofile-type.js` - Introspects UserProfile

### Test Results
```bash
✅ SIGNIN SUCCESS!
   - Access Token: eyJhbGciOi...
   - User ID: f56b5a48-cdbe-452f-af59-59f041bf7402
   - Username: 105841102021
   - Role: mahasiswa

✅ PROFILE SUCCESS!
   - ID: f56b5a48-cdbe-452f-af59-59f041bf7402
   - Username: 105841102021
   - Name: AHMAD FAUZI SAIFUDDIN
   - Email: af9407701@gmail.com
   - Phone: 089504819199
   - Role: mahasiswa
```

---

## 🚀 Migration Guide

### For Developers

**Step 1: Update Imports**
```typescript
// OLD
import { LOGIN } from '@/lib/graphql/mutations-superapps'

// NEW
import { SIGNIN } from '@/lib/graphql/mutations-superapps'
// OR use LOGIN (aliased to SIGNIN for backward compatibility)
```

**Step 2: Update Mutation Calls**
```typescript
// OLD
const result = await executeGraphQLQuery(LOGIN, { 
  username: "105841102021",
  password: "SamaSemua"
})

// NEW
const result = await executeGraphQLQuery(SIGNIN, { 
  loginUserInput: {
    username: "105841102021",
    password: "SamaSemua"
  }
})
```

**Step 3: Update Response Handling**
```typescript
// OLD
const { access_token } = result.data.login

// NEW
const { access_token, user } = result.data.signin
console.log('User ID:', user.id)
console.log('Username:', user.username)
console.log('Role:', user.role)
```

**Step 4: Update Profile Query Handling**
```typescript
// OLD
const { username, fullname, department, role } = profile.data.profile

// NEW
const { id, username, name, email, phone, role } = profile.data.profile
```

---

## ⚠️ Backward Compatibility

### Temporary Compatibility Layer

The `LOGIN` constant is now aliased to `SIGNIN` for backward compatibility:

```typescript
// In mutations-superapps.ts
export const LOGIN = SIGNIN
```

**Warning:** This alias will be **removed in future updates**. Please migrate to using `SIGNIN` directly.

---

## 🔧 Troubleshooting

### Error: "Cannot query field 'fullname' on type 'UserProfile'"

**Solution:** Update your profile query to use `name` instead of `fullname`:
```diff
query {
  profile {
    username
-   fullname
+   name
    role
  }
}
```

### Error: "Cannot query field 'department' on type 'UserProfile'"

**Solution:** Remove `department` field from profile query. This field no longer exists.

### Error: "Variable '$username' of required type 'String!' was not provided"

**Solution:** Update signin mutation to use `loginUserInput` object:
```diff
-signin(username: $username, password: $password)
+signin(loginUserInput: $loginUserInput)

// Variables:
-{ username: "...", password: "..." }
+{ loginUserInput: { username: "...", password: "..." } }
```

---

## 📞 Support

For questions or issues related to this update, please:
1. Check the test scripts in `scripts/` directory
2. Review the API guide in `docs/GRAPHQL_API_GUIDE.md`
3. Inspect the full schema in `docs/GRAPHQL_SCHEMA.json`

---

## ✅ Checklist for Migration

- [ ] Update all `LOGIN` references to `SIGNIN`
- [ ] Change mutation variables to use `loginUserInput` object
- [ ] Update `SigninResponse` interfaces to include `user` object
- [ ] Replace `fullname` with `name` in profile queries
- [ ] Remove `department` from profile queries
- [ ] Add `id`, `email`, `phone` to profile queries
- [ ] Test signin flow end-to-end
- [ ] Clear browser localStorage and cookies
- [ ] Restart development server
- [ ] Test in production environment

---

**Last Updated:** 2025-10-30  
**Schema Version:** v2.0 (2025-10-30)  
**Previous Version:** v1.0 (2025-10-27)
