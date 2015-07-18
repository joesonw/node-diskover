service discovery service


##API


###Create node

> curl -XPOST http://127.0.0.1/keys/foo/bar -d '{"hello":"world"}'

'''json
{
	"name":"bar",
	"path":"foo/bar",
	"data":{
		"hello":"world"
	},
	"children":[]
}
'''


###Get node

> curl http://127.0.0.1/keys/foo/bar

```json
{
	"name":"bar",
	"path":"foo/bar",
	"data":{
		"hello":"world"
	},
	"children":[]
}
```

> curl http://127.0.0.1/keys/foo/bar

```json
{
	"name":"foo",
	"path":"foo",
	"data":{},
	"children":[{
		"name":"bar",
		"path":"foo/bar"
	}]
}
```

> curl http://127.0.0.1/keys/blah

```json
{
	"error":"Node blah not found"
}
```

###Delete node

> curl http://127.0.0.1/keys/foo/bar


> curl http://127.0.0.1/keys/foo


