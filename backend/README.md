to get all process by process id
url ===> http://localhost:5000/api/v1/process/read/process1
method ===> get

to save enviroment variable by process id
url ====> http://localhost:5000/api/v1/process/write
method ===> post
body ===> {
	"process_name": "process1",
	"key": "key",
	"value": "value"
}