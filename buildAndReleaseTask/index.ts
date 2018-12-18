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

        let exe: string = 'Owin.Oas.Generator.exe';
        let userSpecifiedPath: string = tl.getPathInput('path', false, false);

        if(userSpecifiedPath != null)
        {
            exe = pathLib.join(userSpecifiedPath, exe);
        }
        else
        {
            exe = pathLib.join(__dirname, 'Owin.Oas.Generator.1.0.2', 'tools',exe);
        }

        tl.execSync(exe, parms )        
    }
    catch (err) 
    {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();