[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Request

# Class: Request

Stores information for making a request. In general this does not need to be constructed directly.

## Param

An object with the following properties:

## Param

The url to request.

## Param

The function that makes the actual data request.

## Param

The function that is called when the request is cancelled.

## Param

The function that is called to update the request's priority, which occurs once per frame.

## Param

The initial priority of the request.

## Param

Whether to throttle and prioritize the request. If false, the request will be sent immediately. If true, the request will be throttled and sent based on priority.

## Param

Whether to throttle the request by server.

## Param

The type of request.

## Param

A key used to identify the server that a request is going to.

## Constructors

### Constructor

> **new Request**(`options?`): `Request`

#### Parameters

##### options?

###### cancelFunction?

[`CancelCallback`](../types/Daisy.Request.CancelCallback.md)

###### priority?

`number`

###### priorityFunction?

[`PriorityCallback`](../types/Daisy.Request.PriorityCallback.md)

###### requestFunction?

[`RequestCallback`](../types/Daisy.Request.RequestCallback.md)

###### serverKey?

`string`

###### throttle?

`boolean`

###### throttleByServer?

`boolean`

###### type?

`RequestType`

###### url?

`string`

#### Returns

`Request`

## Properties

### cancelFunction

> **cancelFunction**: [`CancelCallback`](../types/Daisy.Request.CancelCallback.md)

The function that is called when the request is cancelled.

***

### priority

> **priority**: `number`

Priority is a unit-less value where lower values represent higher priority.
For world-based objects, this is usually the distance from the camera.
A request that does not have a priority function defaults to a priority of 0.

If priorityFunction is defined, this value is updated every frame with the result of that call.

***

### priorityFunction

> **priorityFunction**: [`PriorityCallback`](../types/Daisy.Request.PriorityCallback.md)

The function that is called to update the request's priority, which occurs once per frame.

***

### requestFunction

> **requestFunction**: [`RequestCallback`](../types/Daisy.Request.RequestCallback.md)

The function that makes the actual data request.

***

### state

> `readonly` **state**: `RequestState`

The current state of the request.

***

### throttle

> `readonly` **throttle**: `boolean`

Whether to throttle and prioritize the request. If false, the request will be sent immediately. If true, the
request will be throttled and sent based on priority.

***

### throttleByServer

> `readonly` **throttleByServer**: `boolean`

Whether to throttle the request by server. Browsers typically support about 6-8 parallel connections
for HTTP/1 servers, and an unlimited amount of connections for HTTP/2 servers. Setting this value
to `true` is preferable for requests going through HTTP/1 servers.

***

### type

> `readonly` **type**: `RequestType`

Type of request.

***

### url

> **url**: `string`

The URL to request.

## Methods

### clone()

> **clone**(`result?`): `Request`

Duplicates a Request instance.

#### Parameters

##### result?

`Request`

The object onto which to store the result.

#### Returns

`Request`

The modified result parameter or a new Resource instance if one was not provided.
