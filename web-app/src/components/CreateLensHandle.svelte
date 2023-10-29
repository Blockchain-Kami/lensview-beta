<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { awesome, close, cross, handleTaken } from '../utils/frontend/appIcon';
	import createLensHandle from '../utils/frontend/createLensHandle';
	import { isSignedIn } from '../services/signInStatus';
	import getDefaultUserProfile from '../utils/frontend/getDefaultUserProfile';
	import { userProfile } from '../services/profile';
	import getUserProfiles from '../utils/frontend/getUserProfiles';
	import checkTxHashBeenIndexed from '../utils/checkTxHashBeenIndexed';
	import Loader from '$lib/Loader.svelte';
	import { fly } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();
	export let showCreateLensHandleModal: boolean;
	let dialog: HTMLDialogElement;
	$: if (dialog && showCreateLensHandleModal) dialog.showModal();

	let userEnteredHandle = '';
	let isCreatingLensHandle = false;
	let isInputInvalid = true;
	let inputInvalidReason = '';

	const initiateCreateLensHandle = async () => {
		isCreatingLensHandle = true;
		const response = await createLensHandle(userEnteredHandle);

		if (response.data.createProfile?.reason === 'HANDLE_TAKEN') {
			isCreatingLensHandle = false;
			addNotification({
				position: 'top-right',
				heading: 'Handle already taken',
				description: 'Please try again with a different handle',
				type: handleTaken,
				removeAfter: 10000
			});
			dialog.close();
		} else {
			if (response.data.createProfile?.txHash) {
				await checkUntilProfileIsCreated(response.data.createProfile?.txHash, Date.now());
			} else {
				isCreatingLensHandle = false;
				addNotification({
					position: 'top-right',
					heading: 'Error occurred',
					description: 'Something went wrong, please try again',
					type: cross,
					removeAfter: 10000
				});
				dialog.close();
			}
		}
	};

	const checkUntilProfileIsCreated = async (txHash: string, startTime: number) => {
		/** If handle is not created within 25 seconds, then stop checking */
		if (Date.now() - startTime > 25000) {
			isCreatingLensHandle = false;
			alert('Something went wrong, please try again');
			return;
		}

		const hasIndexedResponse = await checkTxHashBeenIndexed(txHash);

		if (hasIndexedResponse?.data?.hasTxHashBeenIndexed?.indexed === false) {
			console.log('Waiting for tx to be indexed');
			setTimeout(() => checkUntilProfileIsCreated(txHash, startTime), 100);
		} else {
			const defaultProfile = await getDefaultUserProfile();

			if (defaultProfile !== null) {
				userProfile.setUserProfile(defaultProfile);
			} else {
				const fetchedProfiles = await getUserProfiles();
				userProfile.setUserProfile(fetchedProfiles[0]);
			}

			isSignedIn.setSignInStatus(true);
			addNotification({
				position: 'top-right',
				heading: 'Handle successfully created',
				description: 'Congratulations, your Lens handle has been successfully created',
				type: awesome,
				removeAfter: 5000
			});
			dialog.close();
		}
	};

	const checkInputIsValid = () => {
		if (userEnteredHandle.length === 0) {
			isInputInvalid = true;
			inputInvalidReason = '';
		} else if (/[A-Z]/.test(userEnteredHandle)) {
			isInputInvalid = true;
			inputInvalidReason = 'Handle must be lowercase';
		} else if (!/^[a-z0-9]+$/.test(userEnteredHandle)) {
			isInputInvalid = true;
			inputInvalidReason = 'Handle must be alphanumeric';
		} else if (userEnteredHandle.length < 5) {
			isInputInvalid = true;
			inputInvalidReason = 'Handle must be at least 5 characters long';
		} else if (userEnteredHandle.length > 20) {
			isInputInvalid = true;
			inputInvalidReason = 'Handle must be less than 20 characters long';
		} else {
			isInputInvalid = false;
			inputInvalidReason = '';
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showCreateLensHandleModal = false)}
	on:click|self={() => dialog.close()}
>
	{#if showCreateLensHandleModal}
		<main on:click|stopPropagation transition:fly={{ y: 40, easing: backInOut, duration: 700 }}>
			<div class="CenterRowFlex head">
				<div class="h3 head__title">Sign Up</div>
				<div class="head__close-btn">
					<button on:click={() => dialog.close()}>
						<Icon d={close} />
					</button>
				</div>
			</div>
			<div class="body">
				<div class="body__content">Create Your Lens Handle</div>
				<div class="body__input">
					<input
						type="text"
						placeholder="vitalik"
						bind:value={userEnteredHandle}
						on:input={checkInputIsValid}
					/>
					{#if isInputInvalid}
						<div class="body__input__err-msg">{inputInvalidReason}</div>
					{/if}
				</div>
				<div class="body__notes">
					<div class="body__notes__note">
						Your Lens Handle is a unique identifier that will be used to identify you on the Lens
						Network.
					</div>
					<div class="body__notes__note">
						Your handle will receive the `.test` extension on lens testnet.
					</div>
				</div>
			</div>
			<div class="line" />
			<div class="footer">
				{#if !isCreatingLensHandle}
					<button class="btn" on:click={initiateCreateLensHandle} disabled={isInputInvalid}
						>Create Lens Handle</button
					>
				{:else}
					<button class="btn" disabled
						>Creating &nbsp;
						<Loader />
					</button>
				{/if}
			</div>
		</main>
	{/if}
</dialog>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		background: #1e4748 fixed;
		color: var(--text);
		min-width: 21rem;
		border-radius: 10px;
	}

	.head {
		justify-content: space-between;
		background: #18393a;
		padding: 1.2rem;
		color: var(--primary);
		border-radius: 10px 10px 0 0;
	}

	.body {
		padding: 1rem;
		min-width: 25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.body__input__err-msg {
		margin-top: 0.7rem;
		color: red;
		font-size: var(--small-font-size);
	}

	.body__content {
		font-weight: var(--semi-medium-font-weight);
	}

	.body__input input {
		width: 60%;
	}

	.body__input input:focus {
		border: 2px solid var(--primary);
	}

	.body__notes {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: var(--small-font-size);
	}

	.line {
		border: 0.5px solid #4b6c6d;
		width: 90%;
		margin-top: auto;
		align-self: center;
	}

	.footer {
		margin-left: auto;
		padding: 1rem;
	}
</style>
