import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class ExampleNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Example Node',
		name: 'exampleNode',
		group: ['transform'],
		version: 1,
		description: 'Basic Example Node',
		defaults: {
			name: 'Example Node',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'n8n-nodes-pixel',
				name: 'myString',
				type: 'string',
				default: '',
				placeholder: 'P valulaceholdere',
				description: 'The description text',
			},
			{
				displayName: 'My number',
				name: 'myNumber',
				type: 'number',
				default: '',
				placeholder: 'Digite o teu número',
				description: 'A descrição do nome',
			}, 
			{
				displayName: 'My number',
				name: 'myNumber',
				type: 'options',
				default: 'get',
				options: [
					{
						name: 'Test 1',
						value: 'get'
					},
					{
						name: 'Test 2',
						value: 'get2'
					}
				]
			}, 
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		let item: INodeExecutionData;
		let myString: string;
		let myNumber: number;

		// Iterates over all input items and add the key "myString" with the
		// value the parameter "myString" resolves to.
		// (This could be a different value for each item in case it contains an expression)
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				myString = this.getNodeParameter('myString', itemIndex, '') as string;
				myNumber = this.getNodeParameter('myNumber', itemIndex, '') as number;
				item = items[itemIndex];

				item.json['myString'] = myString;
				item.json['myNumber'] = myNumber;

				

			} catch (error) {
				// This node should never fail but we want to showcase how
				// to handle errors.
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return this.prepareOutputData(items);
	}
}
