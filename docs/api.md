# API Contract

## Preliminary

This contract document is for high level reference only. Many details are not included such as error response, error body, etc.

## User Registration

### Endpoint
`POST /api/register`

### Description
Registers a new user with phone number, OTP, and name.

### Authentication
- Requires a valid session cookie: `heybinder-session`
- The session cookie must be included in the request header or as a cookie.

### Request Headers
| Header           | Value                   | Description                        |
|------------------|-------------------------|----------------------------------|
| `content-type`   | `application/json`       | Specifies JSON format for request body |
| `cookie`         | `heybinder-session=...`  | Session cookie for authentication |

### Request Body
```
{
  "phone": "string",
  "otp": "string",
  "name": "string"
}
```

#### Request Fields Description

| Field  | Type   | Required | Description                          |
|--------|--------|----------|------------------------------------|
| phone  | String | Yes      | User's phone number in international format, e.g., +6212341234 |
| otp    | String | Yes      | One-Time Password for verification |
| name   | String | Yes      | User's name                       |

### Request Example
```
curl --request POST \
  --url http://localhost:3000/api/register \
  --header 'content-type: application/json' \
  --header 'cookie: heybinder-session=<session_token>' \
  --data '{
    "phone": "+6212341234",
    "otp": "123456",
    "name": "bono"
  }'
```

### Response

#### Status Code
- `200 OK` on success

#### Response Body
```
{
  "name": "string",
  "id": "string"
}
```

#### Response Field Details

| Field | Type   | Description               |
|-------|--------|---------------------------|
| name  | String | Registered user's name    |
| id    | String | Unique identifier of user |

### Notes
- The returned `id` is the newly assigned user identifier.
- Ensure the OTP matches the one sent for the phone number provided.

## User Login

### Endpoint
`POST /api/login`

### Description
Logs in a user using their phone number and OTP.

### Authentication
- Requires a valid session cookie: `heybinder-session`
- The session cookie must be included in the request header or as a cookie.

### Request Headers
| Header           | Value                   | Description                        |
|------------------|-------------------------|----------------------------------|
| `content-type`   | `application/json`       | Specifies JSON format for request body |
| `cookie`         | `heybinder-session=...`  | Session cookie for authentication |

### Request Body
```
{
  "phone": "string",
  "otp": "string"
}
```

#### Request Fields Description

| Field  | Type   | Required | Description                          |
|--------|--------|----------|------------------------------------|
| phone  | String | Yes      | User's phone number in international format, e.g., +6212341234 |
| otp    | String | Yes      | One-Time Password for verification |

### Request Example
```
curl --request POST \
  --url http://localhost:3000/api/login \
  --header 'content-type: application/json' \
  --header 'cookie: heybinder-session=<session_token>' \
  --data '{
    "phone": "+6212341234",
    "otp": "123456"
  }'
```

### Response

#### Status Code
- `200 OK` on success

#### Response Body
```
{
  "id": "string",
  "name": "string"
}
```

#### Response Field Details

| Field | Type   | Description           |
|-------|--------|-----------------------|
| id    | String | Unique identifier of user |
| name  | String | User's name           |

### Notes
- The API returns user details upon successful login.
- Ensure the OTP matches the one sent for the phone number provided.

## Get Groups

### Endpoint
`GET /api/groups`

### Description
Retrieves a list of groups accessible to the authenticated user.

### Authentication
- Requires a valid session cookie: `heybinder-session`
- The session cookie must be included in the request header or as a cookie.

### Request Example
```
curl --request GET \
  --url http://localhost:3000/api/groups \
  --header 'cookie: heybinder-session=<session_token>'
```

### Response

#### Status Code
- `200 OK` on success

#### Response Body
```
{
  "groups": [
    {
      "id": "string",
      "name": "string",
      "creator_id": "string",
      "created_at": "string (ISO 8601 timestamp)",
      "updated_at": "string (ISO 8601 timestamp)"
    }
  ]
}
```

#### Response Field Details

| Field        | Type    | Description                            |
|--------------|---------|------------------------------------|
| `groups`     | Array   | List of group objects               |
| `id`         | String  | Unique identifier of the group     |
| `name`       | String  | Name of the group                  |
| `creator_id` | String  | Identifier of the group's creator  |
| `created_at` | String  | ISO 8601 timestamp when created    |
| `updated_at` | String  | ISO 8601 timestamp when last updated|

### Notes
- The API returns all groups associated with the authenticated user.
- Timestamps are in UTC and formatted according to ISO 8601.

## Get Group Detail

### Endpoint
`GET /api/groups/{group_id}`

### Description
Retrieves detailed information about a specific group by its ID.

### Authentication
- Requires a valid session cookie: `heybinder-session`
- The session cookie must be included in the request header or as a cookie.

### Path Parameters
| Parameter   | Type   | Required | Description             |
|-------------|--------|----------|-------------------------|
| `group_id`  | String | Yes      | Unique identifier of the group |

### Request Example
```
curl --request GET \
  --url http://localhost:3000/api/groups/1000000 \
  --header 'cookie: heybinder-session=<session_token>' \
  --cookie 'heybinder-session=<session_token>'
```

### Response

#### Status Code
- `200 OK` on success

#### Response Body
```
{
  "id": "string",
  "name": "string",
  "creator_id": "string",
  "created_at": "string (ISO 8601 timestamp)",
  "updated_at": "string (ISO 8601 timestamp)"
}
```

#### Response Field Details

| Field        | Type   | Description                            |
|--------------|--------|-------------------------------------|
| id           | String | Unique identifier of the group       |
| name         | String | Name of the group                    |
| creator_id   | String | Identifier of the group's creator    |
| created_at   | String | ISO 8601 timestamp when created      |
| updated_at   | String | ISO 8601 timestamp when last updated |

### Notes
- The timestamps are in UTC and follow ISO 8601 format.
- If the group does not exist or access is unauthorized, the API may return appropriate error codes (not shown in example).

## Get Group Messages

### Endpoint
`GET /api/groups/{group_id}/messages`

### Description
Fetches messages from a specific group with support for pagination using message ID and direction.

### Authentication
- Requires a valid session cookie: `heybinder-session`
- The session cookie must be included in the request header or as a cookie.

### Path Parameters
| Parameter   | Type   | Required | Description                 |
|-------------|--------|----------|-----------------------------|
| `group_id`  | String | Yes      | Unique identifier of the group |

### Query Parameters
| Parameter | Type   | Required | Description                                                         |
|-----------|--------|----------|---------------------------------------------------------------------|
| `id`      | String | Yes      | Message ID to paginate relative to                                  |
| `type`    | String | Yes      | Pagination direction, e.g., `"after"` (messages after the given ID) |
| `limit`   | Number | No       | Maximum number of messages to return (default depends on API)      |

### Request Example
```
curl --request GET \
  --url 'http://localhost:3000/api/groups/1000000/messages?id=1&type=after&limit=7' \
  --header 'cookie: heybinder-session=<session_token>' \
  --cookie 'heybinder-session=<session_token>'
```

### Response

#### Status Code
- `200 OK` on success

#### Response Body
```
{
  "messages": [
    {
      "id": "string",
      "group_space_id": "string",
      "user_id": "string",
      "content": "string",
      "created_at": "string (ISO 8601 timestamp)",
      "updated_at": "string (ISO 8601 timestamp)",
      "name": "string"
    }
  ]
}
```

#### Response Field Details

| Field        | Type   | Description                                      |
|--------------|--------|-------------------------------------------------|
| messages     | Array  | List of message objects                          |
| id           | String | Unique identifier of the message                 |
| group_space_id | String | Identifier of the group the message belongs to  |
| user_id      | String | Identifier of the user who sent the message      |
| content      | String | Text content of the message                       |
| created_at   | String | ISO 8601 timestamp when message was created      |
| updated_at   | String | ISO 8601 timestamp when message was last updated |
| name         | String | Name of the user who sent the message             |

### Notes
- Messages are returned in order relative to the specified `id` and `type`.
- Pagination allows clients to fetch messages after or before a certain message ID.
- Timestamps are in UTC and formatted according to ISO 8601.

## Send Message to Group

### Endpoint
`POST /api/groups/{group_id}/messages`

### Description
Sends a new message to the specified group.

### Authentication
- Requires a valid session cookie: `heybinder-session`
- The session cookie must be included in the request header or as a cookie.

### Path Parameters
| Parameter  | Type   | Required | Description                 |
|------------|--------|----------|-----------------------------|
| `group_id` | String | Yes      | Unique identifier of the group |

### Request Headers
| Header           | Value                   | Description                        |
|------------------|-------------------------|----------------------------------|
| `content-type`   | `application/json`       | Specifies JSON format for request body |
| `cookie`         | `heybinder-session=...`  | Session cookie for authentication |

### Request Body
```
{
  "message": "string"
}
```

#### Request Fields Description

| Field    | Type   | Required | Description       |
|----------|--------|----------|-------------------|
| message  | String | Yes      | Content of the message to be sent |

### Request Example
```
curl --request POST \
  --url http://localhost:3000/api/groups/1000000/messages \
  --header 'content-type: application/json' \
  --header 'cookie: heybinder-session=<session_token>' \
  --data '{
    "message": "hey whats cookin"
  }'
```

### Response

#### Status Code
- `200 OK` on success

#### Response Body
```
[
  {
    "id": "string",
    "group_space_id": "string",
    "user_id": "string",
    "content": "string",
    "created_at": "string (ISO 8601 timestamp)",
    "updated_at": "string (ISO 8601 timestamp)"
  }
]
```

#### Response Field Details

| Field         | Type   | Description                          |
|---------------|--------|------------------------------------|
| id            | String | Unique identifier of the new message |
| group_space_id| String | Identifier of the group the message belongs to |
| user_id       | String | Identifier of the user who sent the message |
| content       | String | Text content of the message          |
| created_at    | String | ISO 8601 timestamp when created     |
| updated_at    | String | ISO 8601 timestamp when last updated|

### Notes
- The response is returned as an array containing the newly created message object.
- Timestamps are in UTC and formatted according to ISO 8601.

## Get Group Notes

### Endpoint
`GET /api/groups/{group_id}/notes`

### Description
Retrieves a list of notes associated with the specified group.

### Authentication
- Requires a valid session cookie: `heybinder-session`
- The session cookie must be included in the request header or as a cookie.

### Path Parameters
| Parameter  | Type   | Required | Description                 |
|------------|--------|----------|-----------------------------|
| `group_id` | String | Yes      | Unique identifier of the group |

### Request Example
```
curl --request GET \
  --url http://localhost:3000/api/groups/1000000/notes \
  --header 'cookie: heybinder-session=<session_token>' \
  --cookie 'heybinder-session=<session_token>'
```

### Response

#### Status Code
- `200 OK` on success

#### Response Body
```
{
  "notes": [
    {
      "id": "string",
      "title": "string"
    }
  ]
}
```

#### Response Field Details

| Field | Type   | Description               |
|-------|--------|---------------------------|
| notes | Array  | List of note objects      |
| id    | String | Unique identifier of the note |
| title | String | Title of the note         |

### Notes
- The API returns all notes related to the specified group.

## Get Group Note Detail

### Endpoint
`GET /api/groups/{group_id}/notes/{note_id}`

### Description
Retrieves detailed information of a specific note within a group.

### Authentication
- Requires a valid session cookie: `heybinder-session`
- The session cookie must be included in the request header or as a cookie.

### Path Parameters
| Parameter  | Type   | Required | Description                     |
|------------|--------|----------|---------------------------------|
| `group_id` | String | Yes      | Unique identifier of the group   |
| `note_id`  | String | Yes      | Unique identifier of the note    |

### Request Example
```
curl --request GET \
  --url http://localhost:3000/api/groups/1000000/notes/2 \
  --header 'cookie: heybinder-session=<session_token>' \
  --cookie 'heybinder-session=<session_token>'
```

### Response

#### Status Code
- `200 OK` on success

#### Response Body
```
{
  "note": {
    "id": "string",
    "title": "string",
    "content": "array of objects",
    "created_at": "string (ISO 8601 timestamp)"
  }
}
```

#### Response Field Details

| Field         | Type          | Description                                    |
|---------------|---------------|------------------------------------------------|
| id            | String        | Unique identifier of the note                   |
| title         | String        | Title of the note                               |
| content       | Array         | Array of content blocks representing the note body |
| created_at   | String (ISO 8601) | Timestamp when note was created                    |

### Notes
- The note content is structured following the note editor library's accepted format.
- Timestamps are in UTC and formatted according to ISO 8601.

## Create Group Note

### Endpoint
`PUT /api/groups/{group_id}/notes`

### Description
Updates an existing note or creates a new note in the specified group.

### Authentication
- Requires a valid session cookie: `heybinder-session`
- The session cookie must be included in the request header or as a cookie.

### Path Parameters
| Parameter  | Type   | Required | Description                 |
|------------|--------|----------|-----------------------------|
| `group_id` | String | Yes      | Unique identifier of the group |

### Request Headers
| Header           | Value                   | Description                        |
|------------------|-------------------------|----------------------------------|
| `content-type`   | `application/json`       | Specifies JSON format for request body |
| `cookie`         | `heybinder-session=...`  | Session cookie for authentication |

### Request Body
```
{
  "title": "string",
  "content": "string"
}
```

#### Request Fields Description

| Field   | Type   | Required | Description                   |
|---------|--------|----------|-------------------------------|
| title   | String | Yes      | Title of the note             |
| content | String | Yes      | JSON string denoting the accepted data format of the note content      |

### Request Example
```
curl --request PUT \
  --url http://localhost:3000/api/groups/1000000/notes \
  --header 'content-type: application/json' \
  --header 'cookie: heybinder-session=<session_token>' \
  --data '{
    "title": "Lorem",
    "content": "Lorem ipsum dolor sit amet"
  }'
```

### Response

#### Status Code
- `200 OK` on success

#### Response Body
```
{
  "message": "Note saved successfully"
}
```

#### Response Field Details

| Field     | Type   | Description                  |
|-----------|--------|------------------------------|
| message   | String | Confirmation message for save operation |

### Notes
- This endpoint can be used for both creating new notes or updating existing ones within the group.
- The API returns a success message upon completion.

## Update Group Note

### Endpoint
`PUT /api/groups/{group_id}/notes/{note_id}`

### Description
Updates the title and content of a specific note within the specified group.

### Authentication
- Requires a valid session cookie: `heybinder-session`
- The session cookie must be included in the request header or as a cookie.

### Path Parameters
| Parameter  | Type   | Required | Description                   |
|------------|--------|----------|-------------------------------|
| `group_id` | String | Yes      | Unique identifier of the group |
| `note_id`  | String | Yes      | Unique identifier of the note  |

### Request Headers
| Header           | Value                   | Description                        |
|------------------|-------------------------|----------------------------------|
| `content-type`   | `application/json`       | Specifies JSON format for request body |
| `cookie`         | `heybinder-session=...`  | Session cookie for authentication |

### Request Body
```
{
  "title": "string",
  "content": "string"
}
```

#### Request Fields Description

| Field   | Type   | Required | Description                   |
|---------|--------|----------|-------------------------------|
| title   | String | Yes      | Updated title of the note     |
| content | String | Yes      | Updated text content of the note |

### Request Example
```
curl --request PUT \
  --url http://localhost:3000/api/groups/1000000/notes/4 \
  --header 'content-type: application/json' \
  --header 'cookie: heybinder-session=<session_token>' \
  --data '{
    "title": "Lorem #2",
    "content": "Lorem ipsum dolor sit amet consectetur adipiscing elit"
  }'
```

### Response

#### Status Code
- `200 OK` on success

#### Response Body
```
{
  "message": "Note saved successfully"
}
```

#### Response Field Details

| Field    | Type   | Description                   |
|----------|--------|-------------------------------|
| message  | String | Confirmation message indicating success |

### Notes
- This endpoint is used specifically to update an existing note's details.
- The API returns a success message after the note is saved.