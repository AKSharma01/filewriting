change the file name env.env to .env

to get all process by process id  <br />
url ===> http://localhost:5000/api/v1/process/read/process1 <br />
method ===> get  <br />

to save enviroment variable by process id <br />
url ====> http://localhost:5000/api/v1/process/write <br />
method ===> post <br />
body ===> {
	"process_name": "process1",
	"key": "key",
	"value": "value"
}
