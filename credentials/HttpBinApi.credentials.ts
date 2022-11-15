import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HttpBinApi implements ICredentialType {
	name = 'httpbinApi';
	displayName = 'HttpBin API';
	documentationUrl = '<your-docs-url>';
	properties: INodeProperties[] = [
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: 'https://httpbin.org',
		},

	];
	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.token}}',
			},
		},
	} as IAuthenticateGeneric;

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '',
			body:{
				test: '={{$credentials?.token}}'
			}
		},
	};
}
