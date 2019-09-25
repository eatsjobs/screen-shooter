import { HttpService } from './HttpService';
import FileSaver from './FileSaver';

export default async function errorReporting(){
    const http = new HttpService({ url: 'https://httpbin.org/status/200' });
    const response = await http.collect();
    // TODO: some other stuff
    return FileSaver.save('Any text', `Report.${new Date().toJSON()}.txt`);
}