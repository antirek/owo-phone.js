
function splitStun (text) {
  const arr = text.split('\n');
  const result = []
  for (const s of arr) {
    const serverWithCreds = s.split(',');
    const creds = {};
    if (serverWithCreds[1] && serverWithCreds[2]) {
      creds.username = serverWithCreds[1];
      creds.credential = serverWithCreds[2];
    }
    result.push({...{urls: [serverWithCreds[0]]}, ...creds});
  }
  // console.log('result', result)
  return result;
}

function getHostFromURI (URI) {
  const arr1 = URI.split('@');
  const arr2 = arr1[1].split(':');
  const host = arr2[0];
  if (host && host !== '') {
    return host;
  }  
}

export {
  splitStun,
  getHostFromURI,
}
