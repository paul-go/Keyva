
namespace Cover
{
	/** */
	export async function coverKeyvaGetKey()
	{
		Keyva.delete();
		const kv = new Keyva();
		await kv.set("key", "value");
		const value = await kv.get("key");
		return () => value === "value";
	}
	
	/** */
	export async function coverKeyvaGetKeys()
	{
		Keyva.delete();
		const kv = new Keyva();
		await kv.set([
			["key0", "value0"],
			["key1", "value1"],
			["key2", "value2"],
		]);
		const values = await kv.get<string>(["key0", "key1", "key2"]);
		return [
			() => values.length === 3,
			() => values[0] === "value0",
			() => values[1] === "value1",
			() => values[2] === "value2",
		];
	}
	
	/** */
	export async function coverKeyvaEach()
	{
		Keyva.delete();
		const kv = new Keyva();
		const data: [Keyva.Key, string][] = [
			["key0", "value0"],
			["key1", "value1"],
			["key2", "value2"],
		];
		
		await kv.set(data);
		const values = await kv.each<string>();
		const valuesJson = JSON.stringify(values);
		const dataJson = JSON.stringify(data);
		return () => valuesJson === dataJson;
	}
	
	/** */
	export async function coverKeyvaEachOptions()
	{
		Keyva.delete();
		const kv = new Keyva();
		
		for (let i = -1; ++i < 3;)
			await kv.set("a" + i, i);
		
		for (let i = -1; ++i < 3;)
			await kv.set("b" + i, i);
		
		for (let i = -1; ++i < 3;)
			await kv.set("c" + i, i);
		
		const range = Keyva.prefix("b");
		const results = await kv.each({ range });
		const resultsJson = JSON.stringify(results);
		const resultsJsonExpected = JSON.stringify([["b0", 0], ["b1", 1], ["b2", 2]]);
		
		return () => resultsJson === resultsJsonExpected;
	}
}

//@ts-ignore
if (typeof module === "object") Object.assign(module.exports, { Cover });
