## Back-end test

---

Web API

### Use:

- express
- lodash
- mocha

### API documentation

---

#### Resources

| type | url                                  | description                                | auth     |
| ---- | ------------------------------------ | ------------------------------------------ | -------- |
| get  | /api/user/userId/:userId             | get user data filtered by user id          | -        |
| get  | /api/user/userName/:userName         | get user data filtered by user name        | -        |
| get  | /api/user/policyNumber/:policyNumber | get user data linked to a policy number    | required |
| get  | /api/policies/:userName              | get list of policies filtered by user name | required |

#### Header for authorization

```json
{ "user": "userName" }
```

#### Example

```jason
// request
/api/user/policyNumber/6f514ec4-1726-4628-974d-20afe4da130c

// response
{
    id: "a0ece5db-cd14-4f21-812f-966633e7be86",
    name: "Britney",
    email: "britneyblankenship@quotezart.com",
    role: "admin"
}
```

#### Errors

| code | description     |
| ---- | --------------- |
| 400  | invaild request |
| 403  | unauthorized    |
| 404  | not found       |
