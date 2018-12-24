import tl = require('azure-pipelines-task-lib/task');
import pathLib = require('path');        

async function run() {
    try {
        let parms: string =
            '--assembly '+tl.getInput('assembly',true)+
            ' --startup '+tl.getInput('startup',true);

        let output: string = tl.getInput('output',false);
        if(output != null)
        {
            parms += ' --output '+output;
        }

        let base: string = tl.getInput('base',false);
        if(base != null)
        {
            parms += ' --base '+base;
        }

        let route: string = tl.getInput('route',false);
        if(route != null)
        {
            parms += ' --route '+route;
        }

        let referencePaths: string = tl.getInput('referencepaths', false);
        if(referencePaths != null)
        {
            parms += ' --referencepaths '+referencePaths;
        }

        let headers: string = tl.getInput('headers', false);
        if(headers != null)
        {
            parms += ' --headers '+headers;
        }

        let exe: string = pathLib.join(__dirname, 'node_modules','.bin', 'owin-oas-generator.cmd');

        tl.execSync(exe, parms )        
    }
    catch (err) 
    {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();